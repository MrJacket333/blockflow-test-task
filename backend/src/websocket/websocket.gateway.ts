import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Queue, QueueEvents } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { DatabaseService } from '@database/database.service';
import { JobDto } from '@database/dto/Job.dto';
import { bullConfig } from '../bull.config';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class JobsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private jobClients = new Map<string, Set<string>>();
  private queueEvents: QueueEvents;

  constructor(
    @Inject() private databaseService: DatabaseService,
    @InjectQueue('jobs') private jobsQueue: Queue,
  ) {}

  afterInit() {
    this.queueEvents = new QueueEvents('jobs', bullConfig);

    this.queueEvents.on(
      'progress',
      ({ jobId, data }: { jobId: string; data: number | object }) => {
        const progress = typeof data === 'number' ? data : 0;
        this.emitToJobClients(jobId, 'jobProgress', { jobId, progress });
      },
    );

    this.queueEvents.on('completed', ({ jobId }: { jobId: string }) => {
      this.emitToJobClients(jobId, 'jobCompleted', { jobId });
      this.jobClients.delete(jobId);
    });

    this.queueEvents.on(
      'failed',
      ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
        this.emitToJobClients(jobId, 'jobFailed', {
          jobId,
          error: failedReason,
        });
        this.jobClients.delete(jobId);
      },
    );

    this.queueEvents.on('active', ({ jobId }: { jobId: string }) => {
      this.emitToJobClients(jobId, 'jobStatus', {
        jobId,
        status: 'processing',
      });
    });

    this.queueEvents.on('error', (err: Error) => {
      console.error('QueueEvents error:', err);
    });
  }

  handleConnection() {}

  handleDisconnect(client: Socket) {
    for (const [jobId, sockets] of this.jobClients.entries()) {
      if (sockets.has(client.id)) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.jobClients.delete(jobId);
        }
      }
    }
  }

  @SubscribeMessage('initJob')
  async handleInitJob(client: Socket): Promise<JobDto> {
    const createdJob = await this.databaseService.initNewJob();
    if (!createdJob) {
      throw new Error('Failed to create job');
    }

    await this.jobsQueue.add(createdJob.status, {
      id: createdJob.id,
      status: createdJob.status,
      progress: createdJob.progress,
    });

    const clients = this.jobClients.get(createdJob.id) ?? new Set();
    clients.add(client.id);
    this.jobClients.set(createdJob.id, clients);

    return createdJob;
  }

  private emitToJobClients(
    jobId: string,
    event: string,
    data: Record<string, unknown>,
  ) {
    const sockets = this.jobClients.get(jobId);
    if (sockets) {
      sockets.forEach((socketId) => {
        this.server.to(socketId).emit(event, data);
      });
    }
  }
}
