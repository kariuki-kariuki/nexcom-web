import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProjectIdType } from '../../../@types/types';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  productId: ProjectIdType;

  @IsOptional()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  sizeId: string;

  @IsOptional()
  @IsString()
  customer_description: string;
}
