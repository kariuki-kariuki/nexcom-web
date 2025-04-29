import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { JwtShopGuard } from 'src/auth/guard/jwt-shop.guard';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  @UseGuards(JwtShopGuard)
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtShopGuard)
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtShopGuard)
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  @UseGuards(JwtShopGuard)
  remove(@Param('id') id: string) {
    return this.faqsService.remove(+id);
  }
}
