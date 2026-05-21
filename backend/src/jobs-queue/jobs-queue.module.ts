import { Module } from '@nestjs/common';
import { JobsQueueService } from './jobs-queue.service';

@Module({
  providers: [JobsQueueService]
})
export class JobsQueueModule {}
