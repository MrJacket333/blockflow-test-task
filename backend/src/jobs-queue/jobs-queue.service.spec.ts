import { Test, TestingModule } from '@nestjs/testing';
import { JobsQueueService } from './jobs-queue.service';
import { DatabaseService } from '@database/database.service';
import { getQueueToken } from '@nestjs/bullmq';

describe('JobsQueueService', () => {
  let service: JobsQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsQueueService,
        {
          provide: DatabaseService,
          useValue: {
            getJobById: jest.fn(),
            initNewJob: jest.fn(),
          },
        },
        {
          provide: getQueueToken('jobs'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JobsQueueService>(JobsQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
