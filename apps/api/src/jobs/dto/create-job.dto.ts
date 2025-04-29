import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { JobState } from '../../@types/jobs';
import { Type } from 'class-transformer';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => String)
  requirements: string[];

  @IsNotEmpty()
  @IsEnum(JobState)
  status: JobState;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deadline: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
