import { Inject, Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobStatus } from '@shared/job-status.types';
import { Job } from './job.entity';
import { JobDto } from './dto/Job.dto';

@Injectable()
export class DatabaseService {
  constructor(@Inject() private repo: JobRepository) {}

  public async initNewJob() {
    const savedJob = await this.repo.save({});
    return savedJob ? JobDto.fromEntity(savedJob) : null;
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
