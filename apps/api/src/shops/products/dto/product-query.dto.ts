import { IsOptional, IsNumberString } from 'class-validator';

export class ProductQueryDto {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}
