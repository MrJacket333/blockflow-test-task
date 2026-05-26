import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DatabaseService } from '@database/database.service';
import { from, concatMap, lastValueFrom, tap } from 'rxjs';
import { Inject } from '@nestjs/common';
import { PIPELINE_INJECTION_TOKEN } from '@shared/constants';
import { JobsQueueHandler } from './jobs-queue-handler.interface';
import { WebsocketAdapter } from '@websocket/websocket.adapter';

@Processor('jobs')
export class JobsQueueProcessor extends WorkerHost {
  constructor(
    @Inject() private readonly databaseService: DatabaseService,
    @Inject(PIPELINE_INJECTION_TOKEN)
    private readonly queueHandlers: JobsQueueHandler[],
    @Inject() private readonly websocketAdapter: WebsocketAdapter,
  ) {
    super();
  }

  async process(job: Job<{ id: string; status: string; progress: number }>) {
    const { id } = job.data;

    await this.databaseService.updateJobStatus(id, 'processing');

    await lastValueFrom(
      from(this.queueHandlers).pipe(
        concatMap((handler) =>
          from(handler.handleJob(id)).pipe(
            tap((job) => {
              this.websocketAdapter.emitToJobClients(id, 'jobProgress', {
                jobId: id,
                status: job.status,
                progress: job.progress,
              });
            }),
          ),
        ),
      ),
    );

    this.websocketAdapter.emitToJobClients(id, 'jobCompleted', { jobId: id });
  }
}
