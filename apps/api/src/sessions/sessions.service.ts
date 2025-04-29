import { Inject, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}
  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session';
  }

  findAll() {
    return this.sessionRepository.find();
  }

  findOne(id: string) {
    return this.sessionRepository.findOneByOrFail({ id });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
