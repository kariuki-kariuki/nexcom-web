import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobState } from '../@types/jobs';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    private readonly awsService: AwsService,
  ) {}
  async create(createJobDto: CreateJobDto) {
    const job = await this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  async findAll() {
    const jobs = await this.jobRepository.find({
      where: {
        status: JobState.Published,
      },
    });
    const withLinks = await Promise.all(
      jobs.map(async (job) =>
        job.jd
          ? { ...job, jd: await this.awsService.getSignedURL(job.jd) }
          : job,
      ),
    );
    return withLinks;
  }

  findAllAdmin() {
    return this.jobRepository.find();
  }

  findOne(id: number) {
    return this.jobRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
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

  async updateFile(file: Express.Multer.File, id: number) {
    const url = await this.awsService.uploadFile(file, 'users');
    try {
      await this.jobRepository.update({ id: id }, { jd: url });
      const link = await this.awsService.getSignedURL(url);
      return { link: link };
    } catch (err) {
      throw new UnprocessableEntityException('failed to update');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
