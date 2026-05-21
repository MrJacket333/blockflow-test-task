import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { JobRepository } from './job.repository';
import { JobStatus } from '@shared/job-status.types';
import { Job } from './job.entity';

const mockJob: Job = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  status: 'queued',
  progress: 0,
  createdAt: new Date(),
};

describe('DatabaseService', () => {
  let service: DatabaseService;
  let repo: jest.Mocked<JobRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: JobRepository,
          useValue: {
            save: jest.fn().mockResolvedValue(mockJob),
            getJobById: jest.fn().mockResolvedValue(mockJob),
            updateJobStatus: jest.fn().mockResolvedValue(undefined),
            setJobProgress: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    repo = module.get(JobRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getJobById', () => {
    it('should return a job by id', async () => {
      const result = await service.getJobById(mockJob.id);
      expect(repo.getJobById).toHaveBeenCalledWith(mockJob.id);
      expect(result).toEqual(mockJob);
    });

    it('should return null when job not found', async () => {
      repo.getJobById.mockResolvedValue(null);
      const result = await service.getJobById('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('updateJobStatus', () => {
    it('should update job status', async () => {
      await service.updateJobStatus(mockJob.id, 'done');
      expect(repo.updateJobStatus).toHaveBeenCalledWith(mockJob.id, 'done');
    });
  });

  describe('setJobProgress', () => {
    it('should set job progress', async () => {
      await service.setJobProgress(mockJob.id, 50);
      expect(repo.setJobProgress).toHaveBeenCalledWith(mockJob.id, 50);
    });
  });
});
