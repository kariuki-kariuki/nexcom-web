import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey('main_route')
  @CacheTTL(10000)
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloWorld() {
    return 'Hello World';
  }
}
