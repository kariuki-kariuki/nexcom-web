import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    console.log('Hello World');
    return {
      author: 'Martin Kariuki',
      email: 'business.kariukimartin@gmail.com',
    };
  }
}
