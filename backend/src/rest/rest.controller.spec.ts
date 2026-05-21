import { Test, TestingModule } from '@nestjs/testing';
import { RestController } from './rest.controller';
import { JobsQueueService } from '@jobs-queue/jobs-queue.service';
import { JobDto } from '@database/dto/Job.dto';

const mockJobDto: JobDto = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  status: 'queued',
  progress: 0,
  createdAt: new Date(),
};

describe('RestController', () => {
  let controller: RestController;
  let jobsQueueService: jest.Mocked<JobsQueueService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
      providers: [
        {
          provide: JobsQueueService,
          useValue: {
            getJobById: jest.fn().mockResolvedValue(mockJobDto),
            initJobsQueue: jest.fn().mockResolvedValue(mockJobDto),
          },
        },
      ],
    }).compile();

    controller = module.get<RestController>(RestController);
    jobsQueueService = module.get(JobsQueueService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getJobById', () => {
    it('should return a job by id', async () => {
      const result = await controller.getJobById(mockJobDto.id);
      expect(jobsQueueService.getJobById).toHaveBeenCalledWith(mockJobDto.id);
      expect(result).toEqual(mockJobDto);
    });
  });

  describe('createNewJob', () => {
    it('should create and return a new job', async () => {
      const result = await controller.createNewJob();
      expect(jobsQueueService.initJobsQueue).toHaveBeenCalled();
      expect(result).toEqual(mockJobDto);
    });
  });
});
