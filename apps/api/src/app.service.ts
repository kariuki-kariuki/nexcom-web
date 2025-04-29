import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      author: 'Martin Kariuki',
      email: 'business.kariukimartin@gmail.com',
    };
  }
}
