import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { DatabaseModule } from '@database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { JobsQueueModule } from '@jobs-queue/jobs-queue.module';

@Module({
  imports: [
    DatabaseModule,
    JobsQueueModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  controllers: [RestController],
})
export class RestModule {}
