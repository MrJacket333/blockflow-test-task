import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Job, JobStatus } from './job.entity';

@Injectable()
export class JobRepository extends Repository<Job> {
  constructor(private dataSource: DataSource) {
    super(Job, dataSource.createEntityManager());
  }

  async createJob(): Promise<Job> {
    const job = this.create({
      status: JobStatus.QUEUED,
      progress: 0,
    });
    return this.save(job);
  }

  async updateJobStatus(id: string, status: JobStatus): Promise<Job> {
    await this.update(id, { status });
    return this.findOneBy({ id });
  }

  async getJobById(id: string): Promise<Job | null> {
    return this.findOneBy({ id });
  }

  async setJobProgress(id: string, progress: number): Promise<Job> {
    await this.update(id, { progress });
    return this.findOneBy({ id });
  }
}
