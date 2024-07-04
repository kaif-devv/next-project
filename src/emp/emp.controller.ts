import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { EmpService } from './emp.service';
import { CreateEmpDto } from './dto/create-emp.dto';
import { UpdateEmpDto } from './dto/update-emp.dto';

@Controller('new')
export class EmpController {
  constructor(private readonly empService: EmpService) {}

  @Post('create')
  create(@Body(ValidationPipe) createEmpDto: CreateEmpDto) {
    return this.empService.create(createEmpDto);
  }

  @Get('all')
  findAll() {
    return this.empService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empService.findOne(id);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.empService.remove(id);
  }
}
