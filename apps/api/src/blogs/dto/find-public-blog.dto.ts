import { IsOptional, IsNumberString } from 'class-validator';

export class FindPublicBlogsDto {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;
}
