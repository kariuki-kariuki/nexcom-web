import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';
import { Shop } from '../shops/entities/shop.entity';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq) private faqRepository: Repository<Faq>,
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
  ) {}
  async create(createFaqDto: CreateFaqDto, shopId: string) {
    const faq = new Faq();
    const shop = await this.shopRepository.findOneByOrFail({ id: shopId });
    faq.shop = shop;
    faq.answer = createFaqDto.answer;
    faq.question = createFaqDto.question;
    return this.faqRepository.save(faq);
  }

  findAll(shopId: string) {
    return this.faqRepository.find({
      where: {
        shop: { id: shopId },
      },
    });
  }

  async findOne(id: string) {
    const faq = await this.faqRepository.findOneByOrFail({ id });
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    const faq = await this.findOne(id);

    const { answer = faq.answer, question = faq.question } = updateFaqDto;
    faq.question = question;
    faq.answer = answer;

    return this.faqRepository.save(faq);
  }

  remove(id: number) {
    return this.faqRepository.delete(id);
  }
}
