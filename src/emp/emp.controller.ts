import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Put,
} from '@nestjs/common';

import { EmpService } from './emp.service';
import { CreateEmpDto,UpdateEmpDto,LoginDto } from './dto/emp.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('new')
export class EmpController {
  constructor(private readonly empService: EmpService) {}
// CRUD operations
  @Post('create')
  async create(@Body(ValidationPipe) createEmpDto: CreateEmpDto) {
    try {
      await this.empService.create(createEmpDto);
      return { message: 'Employee Created Successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async findAll() {
    try {
      return await this.empService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.empService.findOne(id);
    } catch (error) {
      throw new HttpException("employee doesnt exist", HttpStatus.NOT_FOUND);
    }
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() updateEmpDto: UpdateEmpDto) {
    try {
      return this.empService.update(id, updateEmpDto);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.empService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Login Route
  @Post('login')
  async login(@Body() login: LoginDto) {
    try {
      return await this.empService.login(login);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
