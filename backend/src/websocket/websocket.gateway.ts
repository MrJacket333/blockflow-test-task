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
import { Queue, QueueEvents, JobProgress } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { DatabaseService } from '@database/database.service';
import { JobDto } from '@database/dto/Job.dto';
import { WebsocketAdapter } from './websocket.adapter';
import { bullConfig } from '../bull.config';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class JobsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private queueEvents: QueueEvents;

  constructor(
    @Inject() private databaseService: DatabaseService,
    @InjectQueue('jobs') private jobsQueue: Queue,
    @Inject() private readonly websocketAdapter: WebsocketAdapter,
  ) {}

  afterInit() {
    this.websocketAdapter.setServer(this.server);

    this.queueEvents = new QueueEvents('jobs', bullConfig);

    this.queueEvents.on(
      'progress',
      ({ jobId, data }: { jobId: string; data: JobProgress }) => {
        const progress = typeof data === 'number' ? data : 0;
        this.websocketAdapter.emitToJobClients(jobId, 'jobProgress', {
          jobId,
          progress,
        });
      },
    );

    this.queueEvents.on('completed', ({ jobId }: { jobId: string }) => {
      this.websocketAdapter.emitToJobClients(jobId, 'jobCompleted', { jobId });
      this.websocketAdapter.removeJobClients(jobId);
    });

    this.queueEvents.on(
      'failed',
      ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
        this.websocketAdapter.emitToJobClients(jobId, 'jobFailed', {
          jobId,
          error: failedReason,
        });
        this.websocketAdapter.removeJobClients(jobId);
      },
    );

    this.queueEvents.on('active', ({ jobId }: { jobId: string }) => {
      this.websocketAdapter.emitToJobClients(jobId, 'jobStatus', {
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
    this.websocketAdapter.removeClient(client.id);
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

    this.websocketAdapter.addClient(createdJob.id, client.id);

    return createdJob;
  }
}
