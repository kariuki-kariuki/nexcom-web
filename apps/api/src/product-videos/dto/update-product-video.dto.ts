import { PartialType } from '@nestjs/swagger';
import { CreateProductVideoDto } from './create-product-video.dto';

export class UpdateProductVideoDto extends PartialType(CreateProductVideoDto) {}
