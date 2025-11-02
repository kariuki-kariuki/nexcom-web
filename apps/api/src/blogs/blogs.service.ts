import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { AwsService } from '../aws/aws.service';
import { Image } from '../shops/product_images/entities/image.entity';
import { User } from '../users/entities/user.entity';
import { FindPublicBlogsDto } from './dto/find-public-blog.dto';

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
    const user = await this.usersRepo.findOneByOrFail({ id: userId });
    featuredImage.url = await this.awsService.uploadFile(file, 'blogs');
    const blog = this.blogRepo.create({
      ...createBlogDto,
      featuredImage,
      author: user,
      tags: createBlogDto.tags.split(',').map((tag) => tag.toLocaleLowerCase()),
    });
    return this.blogRepo.save(blog);
  }

  async findAllPublic(dto: FindPublicBlogsDto) {
    const { page = '1', limit = '10', tag = 'all' } = dto;
    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.featuredImage', 'featuredImage')
      .leftJoinAndSelect('blog.author', 'author')
      .leftJoinAndSelect('author.avatar', 'avatar')
      .where('blog.status = :status', { status: 'Published' })
      .orderBy('blog.created_at', 'DESC');

    if (tag.toLocaleLowerCase() !== 'all') {
      qb.andWhere('LOWER(:tag) = ANY(blog.tags)', {
        tag,
      });
    }

    // pagination example
    const pageX = +page;
    const limitX = +limit;
    qb.skip((pageX - 1) * limitX).take(limitX);

    const [items, total] = await qb.getManyAndCount();
    return { blogs: items, total, page, limit };
  }

  async findMyBlogs(userId: string, dto: FindPublicBlogsDto) {
    const { page = '1', limit = '5' } = dto;
    const qb = this.blogRepo
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.featuredImage', 'featuredImage')
      .leftJoinAndSelect('blog.author', 'author')
      .leftJoinAndSelect('author.avatar', 'avatar')
      .where('blog.author.id = :userId', { userId })
      .orderBy('blog.created_at', 'DESC');

    // pagination example
    const pageX = +page;
    const limitX = +limit;
    console.log(`page ${pageX} limit: ${limitX}`);
    qb.skip((pageX - 1) * limitX).take(limitX);

    const [items, total] = await qb.getManyAndCount();
    return { blogs: items, total, page, limit };
  }

  async findOnePublic(id: string) {
    const blog = await this.blogRepo.findOne({
      where: {
        id,
        status: 'Published',
      },
    });
    return blog;
  }

  async findOneEditable(id: string, userId: string) {
    const blog = await this.blogRepo.findOne({
      where: {
        id,
        status: 'Published',
        author: {
          id: userId,
        },
      },
    });
    return blog;
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    updateBlogDto;
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
    return `This action removes a #${id} blog`;
  }
}
