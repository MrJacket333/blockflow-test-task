import { Test, TestingModule } from '@nestjs/testing';
import { RestController } from './rest.controller';
import { DatabaseService } from '@database/database.service';
import { JobStatus } from '@shared/job-status.enum';
import { Job } from '@database/job.entity';

const mockJob: Job = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  status: JobStatus.QUEUED,
  progress: 0,
  createdAt: new Date(),
};

describe('RestController', () => {
  let controller: RestController;
  let databaseService: jest.Mocked<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            getJobById: jest.fn().mockResolvedValue(mockJob),
            createNewJob: jest.fn().mockResolvedValue(mockJob),
          },
        },
      ],
    }).compile();

    controller = module.get<RestController>(RestController);
    databaseService = module.get(DatabaseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getJobById', () => {
    it('should return a job by id', async () => {
      const result = await controller.getJobById(mockJob.id);
      expect(databaseService.getJobById).toHaveBeenCalledWith(mockJob.id);
      expect(result).toEqual(mockJob);
    });
  });

  describe('createNewJob', () => {
    it('should create and return a new job', async () => {
      const result = await controller.createNewJob();
      expect(databaseService.createNewJob).toHaveBeenCalled();
      expect(result).toEqual(mockJob);
    });
  });
});
