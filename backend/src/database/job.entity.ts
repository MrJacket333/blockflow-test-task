import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { type JobStatus } from '@shared/job-status.types';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    default: 'queued',
  })
  status: JobStatus;

  @Column({
    type: 'int',
    default: 0,
  })
  progress: number;

  @CreateDateColumn()
  createdAt: Date;
}
