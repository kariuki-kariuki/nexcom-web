import { PartialType } from '@nestjs/mapped-types';
import { CreateTenderDto } from './create-tender.dto';

export class UpdateTenderDto extends PartialType(CreateTenderDto) {}
