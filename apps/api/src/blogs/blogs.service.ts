import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    private awsService: AwsService,
  ) {}
  create(createBlogDto: CreateBlogDto) {
    createBlogDto;
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blogs`;
  }

  findOne(id: number) {
    return this.blogRepo.findOneByOrFail({ id });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    updateBlogDto;
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
