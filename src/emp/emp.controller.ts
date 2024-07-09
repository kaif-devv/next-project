import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Put,
  Query,
  ParseIntPipe,
  Res,
  UseGuards,
} from '@nestjs/common';

import { EmpService } from './emp.service';
import { CreateEmpDto, UpdateEmpDto, LoginDto, dptDto } from './dto/emp.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/auth.guard';
//CRUD operations
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

  @Put('/update/:id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: string, @Body() updateEmpDto: UpdateEmpDto) {
    try {
      return await this.empService.update(id, updateEmpDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    try {
      return await this.empService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Login Route
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() login: LoginDto,
  ) {
    try {
      let x = await this.empService.login(login);
      res.append('jwt_key', x);
      return 'Login Successful';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('createmany')
  createMany(@Body() emp: any) {
    return this.empService.createMany(emp);
  }

   @Put('updatemany')
   async updateMany(@Body() emp: any) {
    try {
      return await this.empService.updateMany(emp);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
   
  }
}

//APIs
@Controller('api')
@UseGuards(JwtGuard)
export class EmpApiController {
  constructor(private readonly empService: EmpService) {}
  // Search by name
  @Get('search')
  async Search(@Query('name') name: string) {
    try {
      console.log('Controller: Search by name ' + name);
      return await this.empService.search(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  //Search By Id
  @Get('/id/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.empService.findOne(id);
    } catch (error) {
      throw new HttpException('employee doesnt exist', HttpStatus.NOT_FOUND);
    }
  }

  // MinMax sal of dpt
  @Get('/dptsal')
  getSal(@Query(ValidationPipe) query: dptDto) {
    try {
      return this.empService.getDptSal(query.department);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Employees in the department
  @Get('/dpt')
  getDpt(@Query(ValidationPipe) query: dptDto) {
    try {
      return this.empService.getDpt(query.department);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  //Num of emp in Dpt
  @Get('/dptcount')
  dptCount(@Query(ValidationPipe) query: dptDto) {
    try {
      return this.empService.getDptCount(query.department);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Get emp by performance
  @Get('/performance/:per')
  getByPer(@Param('per', ParseIntPipe) per: number) {
    try {
      return this.empService.getByPer(per);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  //Get Top three employees with high salary
  @Get('/topthree')
  topThree() {
    try {
      return this.empService.getTopThree();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  //Get avg sal of all emp in every dpt
  @Get('/department/avg')
  avgSal() {
    return this.empService.avgSal();
  }

  //Get average and total salary of all the employees

  @Get('/average')
  getAvg() {
    return this.empService.getAvg();
  }

  //Get Paginated employee data

  @Get('/all/:id')
  getPage(@Param('id', ParseIntPipe) id: number) {
    return this.empService.getPaginated(id);
  }

  // Get sorted data as per the fields
  @Get('/sort/:id')
  getFieldSorted(
    @Param('id', ParseIntPipe) id: number,
    @Query('field') field: string,
  ) {
    try {
      return this.empService.getFieldSorted(id, field);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  //Get History
  @Get('history/:id')
  getHistory(@Param('id') id: string) {
    return this.empService.getHistory(id);
  }

}
