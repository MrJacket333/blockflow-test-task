import { DatabaseService } from '@database/database.service';
import { JobsQueueHandler } from '@jobs-queue/jobs-queue-handler.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ThirdStepHandler implements JobsQueueHandler {
  constructor(@Inject() private databaseService: DatabaseService) {}

  public handleJob(jobId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.databaseService.finishJob(jobId).then(resolve).catch(reject);
      }, 3000);
    });
  }
}
