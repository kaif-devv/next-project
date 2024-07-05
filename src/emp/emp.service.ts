import { Injectable } from '@nestjs/common';
import { UpdateEmpDto } from './dto/emp.dto';
import { empInterface,loginInterface,updateInterface } from 'src/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Import Model from mongoose
import { Employee } from 'src/Schemas/emp.schema';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class EmpService {
  constructor(
    private readonly shared: SharedService,
    @InjectModel(Employee.name) private EmployeeModel: Model<Employee>,
  ) {}

  async create(emp: empInterface) {
    let hashesPass = this.shared.hashPassword(emp.password);
    emp.password = hashesPass;
    //Create an employee in MongoDB
    let newEmp = new this.EmployeeModel(emp);
    await newEmp.save();
    if(!newEmp) throw new Error('Employee not created');
    return { message: 'Employee Created Successfully' };
  }

  async findAll() {
    //Find all employees from MongoDB
    let emp = await this.EmployeeModel.find().exec();
    if (!emp) {
      throw new Error('No employees found');
    }
    return emp;
  }

  async findOne(id: string) {
    //Find one employee from MongoDB
    let emp = await this.EmployeeModel.findById({ _id: id });
    if (!emp) {
      throw new Error('Employee not found');
    }
    return emp;
  }

  async update(id: string, updateEmpDto: updateInterface) {
    //Update one employee from MongoDB
    let emp = await this.EmployeeModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateEmpDto },
      { new: true },
    );
    if (!emp) {
      throw new Error('Employee not found');
    }

    return `The Data of ${emp.name} has been updated successfully`;
  }

  async remove(id: string): Promise<any> {
    //Remove one employee from MongoDB
    const employee = await this.EmployeeModel.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    await this.EmployeeModel.deleteOne({ _id: id });
    return { message: 'Employee deleted successfully' };
  }

  //Login Service
  async login(data:loginInterface){
    let emp = await this.EmployeeModel.findOne({email:data.email});
    if(!emp) throw new Error('Invalid email address');
    let prevPass = emp.password;
    let proceed = this.shared.verifyPass(data.password, prevPass);
    let token = this.shared.gToken(data.email);
    if (proceed) {
      return `Login Success the token is ${token}`;
    } else {
      return 'Invalid Credentials';
    }
  }
}
