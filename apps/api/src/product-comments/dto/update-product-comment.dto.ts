import { PartialType } from '@nestjs/swagger';
import { CreateProductCommentDto } from './create-product-comment.dto';

export class UpdateProductCommentDto extends PartialType(CreateProductCommentDto) {}
