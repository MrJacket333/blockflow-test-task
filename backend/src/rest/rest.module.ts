import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';
import { DatabaseModule } from '@database/database.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  controllers: [RestController],
  providers: [RestService],
})
export class RestModule {}
