import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TendersService } from './tenders.service';
import { UpdateTenderDto } from './dto/update-tender.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtShopGuard } from '../auth/guard/jwt-shop.guard';

@Controller('tenders')
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Post()
  @UseGuards(JwtShopGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createTenderDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.tendersService.create(createTenderDto, file);
  }

  @Get()
  findAll() {
    return this.tendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tendersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenderDto: UpdateTenderDto) {
    return this.tendersService.update(+id, updateTenderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tendersService.remove(+id);
  }
}
