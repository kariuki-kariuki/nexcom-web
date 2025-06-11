import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProjectIdType } from '../../../@types/types';

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

export class UpdateGroupProfileDto {
  @IsString()
  @IsUUID()
  groupId: ProjectIdType;

  file: Express.Multer.File;
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

export class AddGroupMembersDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  membersId: string[];

  @IsNotEmpty()
  @IsString()
  groupId: string;
}

export class AddRemoveAdminDTO {
  @IsString()
  @IsUUID()
  userId: ProjectIdType;

  @IsString()
  @IsUUID()
  groupId: ProjectIdType;
}
