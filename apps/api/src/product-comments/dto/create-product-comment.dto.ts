import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  parentId: string;
}
