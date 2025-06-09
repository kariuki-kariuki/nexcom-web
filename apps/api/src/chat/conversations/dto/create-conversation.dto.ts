import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateConversationDTO {
  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  productId?: string;

  files?: Array<Express.Multer.File>;
}

export class CreateGroupDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  membersId: string[];

  file: Express.Multer.File;

  @IsNotEmpty()
  @IsString()
  groupName: string;
}
