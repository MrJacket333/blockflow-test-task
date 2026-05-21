import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('jobs')
export class RestController {
  constructor(@Inject() private databaseService: DatabaseService) {}

  @Get(':id')
  public async getJobById(@Param('id', ParseUUIDPipe) jobId: string) {
    return this.databaseService.getJobById(jobId);
  }

  @Post()
  public async createNewJob() {
    return this.databaseService.createNewJob();
  }
}
