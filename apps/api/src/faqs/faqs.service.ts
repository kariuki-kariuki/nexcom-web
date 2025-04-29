import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entities/faq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaqsService {
  constructor(@InjectRepository(Faq) private faqRepository: Repository<Faq>) {}
  create(createFaqDto: CreateFaqDto) {
    const faq = new Faq();
    faq.answer = createFaqDto.answer;
    faq.question = createFaqDto.question;
    return this.faqRepository.save(faq);
  }

  findAll() {
    return this.faqRepository.find();
  }

  async findOne(id: number) {
    const faq = await this.faqRepository.findOneByOrFail({ id });
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
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
