import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hola que tal';
  }

  @Get('/new')
  newEndpoint() {
    return 'yosoy nuevo';
  }

  @Get('/hello')
  hello() {
    return 'nuevo';
  }


}
