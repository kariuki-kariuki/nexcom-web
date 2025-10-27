import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';
import { Image } from '../shops/product_images/entities/image.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    private awsService: AwsService,
  ) {}
  async create(
    createBlogDto: CreateBlogDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    const featuredImage = new Image();
    featuredImage.altText = `${createBlogDto.title} featured Image`;
    featuredImage.url = await this.awsService.uploadFile(file, 'blogs');
    const blog = this.blogRepo.create({ ...createBlogDto, featuredImage });
    const user = await this.usersRepo.findOneByOrFail({ id: userId });
    blog.author = user;
    return this.blogRepo.save(blog);
  }

  findAll() {
    return this.blogRepo.find();
  }

  findOne(id: string) {
    return this.blogRepo.findOneByOrFail({ id });
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    updateBlogDto;
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
    return `This action removes a #${id} blog`;
  }
}
