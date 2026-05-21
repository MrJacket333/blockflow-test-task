import { Inject, Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobStatus } from '@shared/job-status.enum';
import { Job } from './job.entity';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject() private repo: JobRepository,
    @InjectQueue('jobs') private jobsQueue: Queue,
  ) {}

  public async initNewJob() {
    const savedJob = this.repo.save({});
    await this.jobsQueue.add('step_1', savedJob);
    return savedJob;
  }

  public async getJobById(jobId: string): Promise<Job | null> {
    return this.repo.getJobById(jobId);
  }

  public async updateJobStatus(jobId: string, status: JobStatus) {
    await this.repo.updateJobStatus(jobId, status);
  }

  public async setJobProgress(jobId: string, progress: number) {
    await this.repo.setJobProgress(jobId, progress);
  }
}
