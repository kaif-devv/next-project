import { Module } from '@nestjs/common';
import { EmpService } from './emp.service';
import { EmpApiController, EmpController } from './emp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/Schemas/emp.schema';
import { SharedModule } from 'src/shared/shared.module';
import { History, HistorySchema } from 'src/Schemas/emp.schema';
@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
  ],
  controllers: [EmpController, EmpApiController],
  providers: [EmpService],
})
export class EmpModule {}
