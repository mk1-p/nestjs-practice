import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('prefix') // Controller Class Prefix Path
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  getPost() {
    return 'get Post!';
  }
}
