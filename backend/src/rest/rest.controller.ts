import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { JobDto } from '../database/dto/Job.dto';
import { JobsQueueService } from '@jobs-queue/jobs-queue.service';

@Controller('jobs')
export class RestController {
  constructor(@Inject() private jobsQueueService: JobsQueueService) {}

  @Get(':id')
  public async getJobById(
    @Param('id', ParseUUIDPipe) jobId: string,
  ): Promise<JobDto> {
    return this.jobsQueueService.getJobById(jobId);
  }

  @Post()
  public async createNewJob(): Promise<JobDto> {
    return this.jobsQueueService.initJobsQueue();
  }
}
