import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceFileDto } from './create-resource-file.dto';

export class UpdateResourceFileDto extends PartialType(CreateResourceFileDto) {}
