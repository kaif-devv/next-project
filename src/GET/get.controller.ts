import { Controller, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
import { GetService } from './get.service';
import { SharedService } from 'src/shared/shared.service.service';
import { empSchema } from 'src/interfaces';

@Controller()
export class GetController {
  constructor(
    private readonly getService: GetService,
    private readonly shared: SharedService
  ) {}

  @Get('/all')
  getAll(): empSchema[]{
    const emp = this.shared.getJson();
    return emp
  }

  @Get('/search/:id')
  getId(@Param('id', ParseIntPipe) id:number) {
    return this.getService.getById(id);
  }

  @Get('/read')
  getName(@Query('name') name: string){
    console.log('Name parameter:', name);
    const data = this.getService.getByName(name);
    console.log('Filtered data:', data);
    return data;
  }

}
