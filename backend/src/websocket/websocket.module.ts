import { Module } from '@nestjs/common';
import { JobsGateway } from './websocket.gateway';
import { DatabaseModule } from '@database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { WebsocketAdapter } from './websocket.adapter';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  providers: [JobsGateway, WebsocketAdapter],
  exports: [WebsocketAdapter],
})
export class WebsocketModule {}
