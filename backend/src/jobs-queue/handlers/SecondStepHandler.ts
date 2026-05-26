import { DatabaseService } from '@database/database.service';
import { Job } from '@database/job.entity';
import { JobsQueueHandler } from '@jobs-queue/jobs-queue-handler.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SecondStepHandler implements JobsQueueHandler {
  constructor(@Inject() private databaseService: DatabaseService) {}

  public handleJob(jobId: string): Promise<Job> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.databaseService
          .setJobProgress(jobId, 70)
          .then(() => this.databaseService.getJobById(jobId))
          .then((job) => resolve(job!))
          .catch(reject);
      }, 3000);
    });
  }
}
