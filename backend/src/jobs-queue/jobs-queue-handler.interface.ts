import { Job } from '@database/job.entity';

export interface JobsQueueHandler {
  handleJob(jobId: string): Promise<Job>;
}
