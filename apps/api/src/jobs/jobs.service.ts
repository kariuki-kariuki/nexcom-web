import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobState } from '../@types/jobs';
import { AwsService } from '../aws/aws.service';
import { Image } from '../shops/product_images/entities/image.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    private readonly awsService: AwsService,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(job);
  }

  async findAll() {
    const jobs = await this.jobRepository.find({
      where: {
        status: JobState.Published,
      },
    });
    return jobs;
  }

  findAllAdmin() {
    return this.jobRepository.find();
  }

  findOne(id: string) {
    return this.jobRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.findOne(id);
    const {
      title = job.title,
      description = job.description,
      deadline = job.deadline,
      location = job.description,
      type = job.type,
      status = job.status,
      requirements = job.requirements,
    } = updateJobDto;
    job.title = title;
    job.description = description;
    job.deadline = deadline;
    job.location = location;
    job.type = type;
    job.status = status;
    job.requirements = requirements;
    return this.jobRepository.save(job);
  }

  async updateFile(file: Express.Multer.File, id: string) {
    const job = await this.jobRepository.findOneByOrFail({ id });
    try {
      if (file) {
        const urlKey = await this.awsService.uploadFile(file, 'users');
        if (job.jd) {
          await this.awsService.deleteImage(job.jd.url);
          job.jd.url = urlKey;
        } else {
          const jd = new Image();
          jd.url = urlKey;
          job.jd = jd;
        }
      }
      const savedJob = await this.jobRepository.save(job);

      return { link: savedJob.jd.signedUrl };
    } catch (err) {
      throw new UnprocessableEntityException('failed to update');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
