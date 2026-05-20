import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './database.config';
import { bullConfig } from './bull.config';
import { DatabaseModule } from './database/database.module';
import { QueuesModule } from './queues/queues.module';
import { WebsocketModule } from './websocket/websocket.module';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    BullModule.forRoot(bullConfig),
    DatabaseModule,
    QueuesModule,
    WebsocketModule,
    RestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
