import { DatabaseService } from '@database/database.service';
import { JobDto } from '@database/dto/Job.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class JobsQueueService {
  constructor(
    @Inject() private databaseService: DatabaseService,
    @InjectQueue('jobs') private jobsQueue: Queue,
  ) {}

  public async getJobById(jobId: string): Promise<JobDto> {
    const job = await this.databaseService.getJobById(jobId);
    if (!job) {
      throw new HttpException('Job not found', 404);
    }
    return JobDto.fromEntity(job);
  }

  public async initJobsQueue(): Promise<JobDto> {
    const createdJob = await this.databaseService.initNewJob();
    if (!createdJob) {
      throw new HttpException('Error creating job', 500);
    }
    await this.jobsQueue.add(createdJob.status, createdJob);
    return createdJob;
  }
}
