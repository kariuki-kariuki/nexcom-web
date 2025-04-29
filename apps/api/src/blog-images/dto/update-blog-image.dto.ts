import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogImageDto } from './create-blog-image.dto';

export class UpdateBlogImageDto extends PartialType(CreateBlogImageDto) {}
