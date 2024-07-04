import { Module } from '@nestjs/common';
import { EmpService } from './emp.service';
import { EmpController } from './emp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Employee, EmployeeSchema } from 'src/Schemas/emp.schema';
@Module({
  imports:[MongooseModule.forFeature([
    { name: Employee.name, schema: EmployeeSchema },
  ])],
  controllers: [EmpController],
  providers: [EmpService],
})
export class EmpModule {}
