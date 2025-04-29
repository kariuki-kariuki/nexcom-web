import { IsNotEmpty, IsString } from 'class-validator';
import { ProjectIdType } from 'src/@types/types';

export class CreateProductVideoDto {
  @IsNotEmpty()
  productId: ProjectIdType;

  @IsNotEmpty()
  @IsString()
  description: string;
}
