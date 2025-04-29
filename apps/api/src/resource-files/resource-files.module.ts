import { Module } from '@nestjs/common';
import { ResourceFilesService } from './resource-files.service';
import { ResourceFilesController } from './resource-files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceFile } from './entities/resource-file.entity';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceFile]), AwsModule],
  controllers: [ResourceFilesController],
  providers: [ResourceFilesService],
})
export class ResourceFilesModule {}
