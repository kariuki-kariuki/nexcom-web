import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { MessageState } from '../../../@types/chat/chat';
import { ProjectIdType } from '../../../@types/types';

export class UpdateStateDTO {
  @IsNumber()
  @IsOptional()
  conversationId: ProjectIdType;

  @IsString()
  @IsNotEmpty()
  state: MessageState;

  @IsString()
  @IsNotEmpty()
  receiverId: string;
}
