import { Controller, Get, Query, ParseIntPipe, Param, UseGuards } from '@nestjs/common';
import { GetService } from './get.service';
import { SharedService } from 'src/shared/shared.service';
import { empSchema } from 'src/interfaces';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller()
@UseGuards(JwtGuard)
export class GetController {
  constructor(
    private readonly getService: GetService,
    private readonly shared: SharedService,
  ) {}
  //TESTING GUARDS

  @Get('guard')
  gTest() {
    return 'EXECUTED'
  }

  //Get all the employees
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
  getName(@Query('name') name: string): empSchema[] {
    const data = this.getService.getByName(name);
    return data;
  }
  // MinMax sal of dpt
  @Get('/dptsal')
  getSal(@Query('dpt') dpt: string) {
    return this.getService.getDptSal(dpt);
  }

  // Employees in the department
  @Get('/department')
  getDpt(@Query('dpt') dpt: string) {
    return this.getService.getDpt(dpt);
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

  //Get Top three employees with high salary
  @Get('/topthree')
  topThree() {
    return this.getService.getTopThree();
  }

  //Get avg sal of all emp in every dpt
  @Get('/department/avg')
  avgSal() {
    return this.getService.avgSal();
  }
  //Get average and total salary of all the employees

  @Get('/average')
  getAvg() {
    return this.getService.getAvg();
  }

  //Get Paginated employee data

  @Get('/all/:id')
  getPage(@Param('id', ParseIntPipe) id: number) {
    return this.getService.getPaginated(id);
  }
  // Get sorted data as per the fields
  @Get('/sort/:id')
  getFieldSorted(
    @Param('id', ParseIntPipe) id: number,
    @Query('field') field: string,
  ) {
    return this.getService.getFieldSorted(id, field);
  }

  //Generate a CSV

  @Get('report')
  getCsv() {
    return this.getService.geCsv();
  }
}
