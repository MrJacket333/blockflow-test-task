import { Module } from '@nestjs/common';
import { JobsGateway } from './websocket.gateway';
import { DatabaseModule } from '@database/database.module';
import { JobsQueueModule } from '@jobs-queue/jobs-queue.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    DatabaseModule,
    JobsQueueModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  providers: [JobsGateway],
})
export class WebsocketModule {}
