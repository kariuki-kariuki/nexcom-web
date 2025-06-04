import { IsNotEmpty, IsString } from 'class-validator';
import { ProjectIdType } from '../../@types/types';

export class CreateProductVideoDto {
  @IsNotEmpty()
  productId: ProjectIdType;

  @IsNotEmpty()
  @IsString()
  description: string;
}
