import { Controller, Get, Query, ParseIntPipe, Param } from '@nestjs/common';
import { GetService } from './get.service';
import { SharedService } from 'src/shared/shared.service';
import { empSchema } from 'src/interfaces';

@Controller()
export class GetController {
  constructor(
    private readonly getService: GetService,
    private readonly shared: SharedService,
  ) {}

  @Get('/all')
  getAll(): empSchema[] {
    const emp = this.shared.getJson();
    return emp;
  }
  //Search by ID
  @Get('/search/:id')
  getId(@Param('id', ParseIntPipe) id: number) {
    return this.getService.getById(id);
  }
  //Search by name
  @Get('/read')
  getName(@Query('name') name: string) {
    const data = this.getService.getByName(name);
    return data;
  }
  // MinMax sal of dpt
  @Get('/dptsal')
  getSal(@Query('dpt') dpt: string) {
    return this.getService.getDptSal(dpt);
  }
  //Num of emp in Dpt
  @Get('/dptcount')
  dptCount(@Query('dpt') dpt: string) {
    return this.getService.getDptCount(dpt);
  }
  // Get emp by performance
  @Get('/performance/:per')
  getByPer(@Param('per', ParseIntPipe) per: number) {
    return this.getService.getByPer(per);
  }
}
