import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), AwsModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
