import { Module } from '@nestjs/common';
import { JobsQueueService } from './jobs-queue.service';
import { JobsQueueProcessor } from './jobs-queue.processor';
import { DatabaseModule } from '@database/database.module';
import { BullModule } from '@nestjs/bullmq';
import { WebsocketModule } from '@websocket/websocket.module';
import { PIPELINE_INJECTION_TOKEN } from '@shared/constants';
import { FirstStepHandler } from './handlers/FirstStepHandler';
import { SecondStepHandler } from './handlers/SecondStepHandler';
import { ThirdStepHandler } from './handlers/ThirdStepHandler';

@Module({
  imports: [
    DatabaseModule,
    WebsocketModule,
    BullModule.registerQueue({
      name: 'jobs',
    }),
  ],
  providers: [
    JobsQueueService,
    JobsQueueProcessor,
    FirstStepHandler,
    SecondStepHandler,
    ThirdStepHandler,
    {
      provide: PIPELINE_INJECTION_TOKEN,
      useFactory: (
        firstStep: FirstStepHandler,
        secondStep: SecondStepHandler,
        thirdStep: ThirdStepHandler,
      ) => [firstStep, secondStep, thirdStep],
      inject: [FirstStepHandler, SecondStepHandler, ThirdStepHandler],
    },
  ],
  exports: [JobsQueueService],
})
export class JobsQueueModule {}
