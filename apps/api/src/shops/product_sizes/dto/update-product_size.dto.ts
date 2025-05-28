import { PartialType } from '@nestjs/mapped-types';
import { CreateProductSizeDto } from './create-product_size.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateProductSizeDto extends PartialType(CreateProductSizeDto) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
