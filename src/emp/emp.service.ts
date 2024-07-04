import { Injectable } from '@nestjs/common';
import { UpdateEmpDto } from './dto/update-emp.dto';
import { empInterface } from 'src/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Import Model from mongoose
import { Employee, EmployeeSchema } from 'src/Schemas/emp.schema';

@Injectable()
export class EmpService {
  constructor(
    @InjectModel(Employee.name) private EmployeeModel: Model<Employee>,
  ) {}
  
  async create(emp: empInterface) {
    const createdEmp = new this.EmployeeModel(emp);
    let empData = await createdEmp.save();
    return empData;
  }

  findAll() {
    //Find all employees from MongoDB
    return this.EmployeeModel.find().exec();
  }

  findOne(id: string) {
    //Find one employee from MongoDB
    return this.EmployeeModel.findById(id);
  }

  update(id: number, updateEmpDto: UpdateEmpDto) {
    return `This action updates a #${id} emp`;
  }

  remove(id: string) {
    //Remove one employee from MongoDB
    return this.EmployeeModel.deleteOne({ _id: id });
  }
}
