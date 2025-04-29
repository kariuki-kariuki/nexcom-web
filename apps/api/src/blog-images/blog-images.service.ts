import { Injectable } from '@nestjs/common';
import { CreateBlogImageDto } from './dto/create-blog-image.dto';
import { UpdateBlogImageDto } from './dto/update-blog-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogImage } from './entities/blog-image.entity';
import { Repository } from 'typeorm';
import { BlogsService } from '../blogs/blogs.service';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class BlogImagesService {
  constructor(
    @InjectRepository(BlogImage) private imageRepo: Repository<BlogImage>,
    private blogService: BlogsService,
    private awsService: AwsService,
  ) {}
  async create(
    createBlogImageDto: CreateBlogImageDto,
    files: Array<Express.Multer.File>,
  ) {
    const images = await Promise.all(
      files.map(async (file) => {
        const image = new BlogImage();
        const blog = await this.blogService.findOne(
          parseInt(createBlogImageDto.blogId, 10),
        );
        image.url = await this.awsService.uploadFile(file, 'products');
        image.blog = blog;
        image.name = createBlogImageDto.name
          ? createBlogImageDto.name
          : file.filename;
        image.altText = createBlogImageDto.altText
          ? createBlogImageDto.altText
          : `Product ${blog.id} image`;
        return await this.imageRepo.save(image);
      }),
    );
    return this.awsService.getMultipleUrls(images);
  }

  findAll() {
    return `This action returns all blogImages`;
  }

  findOne(id: number) {
    return this.imageRepo.findOneByOrFail({ id });
  }

  update(id: number, updateBlogImageDto: UpdateBlogImageDto) {
    updateBlogImageDto;
    return `This action updates a #${id} blogImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogImage`;
  }
}
