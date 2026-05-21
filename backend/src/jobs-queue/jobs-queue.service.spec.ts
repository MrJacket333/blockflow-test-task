import { Test, TestingModule } from '@nestjs/testing';
import { JobsQueueService } from './jobs-queue.service';

describe('JobsQueueService', () => {
  let service: JobsQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsQueueService],
    }).compile();

    service = module.get<JobsQueueService>(JobsQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
