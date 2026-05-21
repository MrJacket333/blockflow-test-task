import { Inject, Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { Job, JobStatus } from './job.entity';

@Injectable()
export class DatabaseService {
  constructor(@Inject() private repo: JobRepository) {}

  public async createNewJob() {
    return this.repo.save({});
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
