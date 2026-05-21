import { Job } from '@database/job.entity';
import { JobStatus } from '@shared/job-status.enum';

export class JobDto {
  id: string;
  status: JobStatus;
  progress: number;
  createdAt: Date;

  static fromEntity(job: Job): JobDto {
    return {
      id: job.id,
      status: job.status,
      progress: job.progress,
      createdAt: job.createdAt,
    };
  }
}
