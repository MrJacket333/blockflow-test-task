import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DatabaseService } from '@database/database.service';

@Processor('jobs')
export class JobsQueueProcessor extends WorkerHost {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  async process(job: Job<{ id: string; status: string; progress: number }>) {
    const { id } = job.data;

    await this.databaseService.updateJobStatus(id, 'processing');

    for (let progress = 0; progress <= 100; progress += 10) {
      await this.databaseService.setJobProgress(id, progress);
      await job.updateProgress(progress);
      await this.sleep(1000);
    }

    await this.databaseService.updateJobStatus(id, 'done');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
