import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetService } from './get.service';

@Controller()
export class GetController {
  constructor(private readonly getService: GetService) {}

  @Get()
  getHello(): string {
    return this.getService.getHello();
  }

  @Get('/c')
  getCats(): string {
    const varr: string = this.getService.getCats();
    return varr;
  }

  @Get('/par/:id')
  getId(@Param('id', ParseIntPipe) id: string) {
    return `The id is ${id}`;
  }
}
