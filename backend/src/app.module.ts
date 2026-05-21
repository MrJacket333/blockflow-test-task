import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { bullConfig } from './bull.config';
import { DatabaseModule } from './database/database.module';
import { WebsocketModule } from './websocket/websocket.module';
import { RestModule } from './rest/rest.module';
import { BullModule } from '@nestjs/bullmq';
import { JobsQueueModule } from './jobs-queue/jobs-queue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    BullModule.forRoot(bullConfig),
    DatabaseModule,
    WebsocketModule,
    RestModule,
    JobsQueueModule,
  ],
})
export class AppModule {}
