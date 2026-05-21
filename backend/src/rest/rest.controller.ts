import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { JobDto } from './dto/Job.dto';

@Controller('jobs')
export class RestController {
  constructor(@Inject() private databaseService: DatabaseService) {}

  @Get(':id')
  public async getJobById(
    @Param('id', ParseUUIDPipe) jobId: string,
  ): Promise<JobDto> {
    const job = await this.databaseService.getJobById(jobId);
    return JobDto.fromEntity(job);
  }

  @Post()
  public async createNewJob(): Promise<JobDto> {
    const job = await this.databaseService.initNewJob();
    return JobDto.fromEntity(job);
  }
}
