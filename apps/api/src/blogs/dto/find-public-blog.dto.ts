import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class FindPublicBlogsDto {
  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;

  @IsOptional()
  @IsString()
  tag: string;
}
