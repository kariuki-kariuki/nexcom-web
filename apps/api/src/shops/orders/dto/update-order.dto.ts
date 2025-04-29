import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  size?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  customer_description: string;
}
