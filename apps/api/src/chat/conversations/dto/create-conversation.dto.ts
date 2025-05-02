import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
