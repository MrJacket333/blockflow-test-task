import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { JobRepository } from './job.repository';
import { Job } from './job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [DatabaseService, JobRepository],
  exports: [DatabaseService],
})
export class DatabaseModule {}
