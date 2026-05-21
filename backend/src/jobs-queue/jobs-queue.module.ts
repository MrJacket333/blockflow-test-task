import { Module } from '@nestjs/common';
import { JobsQueueService } from './jobs-queue.service';
import { JobsQueueProcessor } from './jobs-queue.processor';
import { DatabaseModule } from '@database/database.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  providers: [JobsQueueService, JobsQueueProcessor],
  exports: [JobsQueueService],
})
export class JobsQueueModule {}
