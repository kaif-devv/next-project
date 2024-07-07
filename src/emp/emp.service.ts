import { Injectable } from '@nestjs/common';
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
  ) { }

  async create(emp: empInterface) {
    let hashesPass = this.shared.hashPassword(emp.password);
    emp.password = hashesPass;
    //Create an employee in MongoDB
    let newEmp = new this.EmployeeModel(emp);
    await newEmp.save();
    if (!newEmp) throw new Error('Employee not created');
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

  async update(id: string, empBody: updateInterface) {
    //Update one employee from MongoDB
    let hashesPass = this.shared.hashPassword(empBody.password);
    empBody.password = hashesPass;
    let emp = await this.EmployeeModel.findByIdAndUpdate(
      { _id: id },
      { $set: empBody },
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
  async login(data: loginInterface) {
    let emp = await this.EmployeeModel.findOne({ email: data.email });
    if (!emp) throw new Error('Invalid email address');
    let prevPass = emp.password;
    let proceed = this.shared.verifyPass(data.password, prevPass);
    let token = this.shared.gToken(data.email);
    if (proceed) {
      return `Login Success the token is ${token}`;
    } else {
      return 'Invalid Credentials';
    }
  }

  //Search by name
  async search(name: string) {
    let emp: empInterface[] = await this.EmployeeModel.find({ name: name });
    console.log('working');
    if (emp.length === 0) {
      throw new Error('No employee found');
    }
    return emp;
  }

  //Get minimum and maximum salary for the department
  async getDptSal(dpt: string) {
    const empData: empInterface[] = await this.EmployeeModel.find({
      department: dpt,
    });
    if (empData.length === 0) throw new Error('No employees in the department');
    empData.sort((a, b) => b.salary - a.salary);
    let maxSal: number = empData[0].salary;
    let minSal: number = empData[empData.length - 1].salary;
    return `The max and min salary of department ${dpt} is ${maxSal} and ${minSal}`;
  }

  //All Employees in the department
  async getDpt(dpt: string) {
    const empData: empInterface[] = await this.EmployeeModel.find({
      department: dpt,
    });
    if (empData.length === 0)
      throw new Error(`No employees in the department ${dpt}`);
    return empData;
  }

  //No of emp in DPT
  async getDptCount(dpt: string) {
    try {
      //using the previously defined getDpt method
      let empData: empInterface[] = await this.getDpt(dpt);
      return `The number of employees in a department are ${empData.length}`;
    } catch (error) {
      throw new Error(`No employees in the department ${dpt}`);
    }
  }

  //Get by perfoemance

  async getByPer(per: number) {
    const empData: empInterface[] = await this.EmployeeModel.find({ performance: { $gte: per } });
    if (empData.length === 0) throw new Error('no employee with the performance range');
    return empData;
  }

  //Get top three employees by Sal
  async getTopThree() {
    const empData: empInterface[] = await this.EmployeeModel.find().sort({ salary: -1 });
    if (empData.length === 0) throw new Error('No employees found');
    let count = 0;
    for (let i = 2; i < empData.length; i++) {
      if (empData[i].salary === empData[i + 1].salary) {
        continue;
      } else {
        count = i + 1;
        break;
      }
    }
    return empData.slice(0, count);
  }

  //Get avg sal of all emp in dpt
  async avgSal() {
    const empData: empInterface[] = await this.EmployeeModel.find().exec();

    let empJSON = empData;
    const dptObj: { [key: string]: number[] } = {}; // Add index signature to dptObj
    empJSON.map((e: { department: string }) => {
      dptObj[e.department] = [];
    });
    empJSON.map((e: { department: string; salary: number }) => {
      dptObj[e.department].push(e.salary);
    });

    let responseString: string = '';
    Object.keys(dptObj).forEach((key) => {
      const salaries: number[] = dptObj[key];
      let sum = 0;
      for (let i = 0; i < salaries.length; i++) {
        sum += salaries[i];
      }
      let avg: number = sum / salaries.length;
      responseString += `The average sal of the department ${key} is ${avg}\n`;
    });
    return responseString;
  }

  //Get average salaries of all the employees
  async getAvg() {
    const empData: empInterface[] = await this.EmployeeModel.find().exec();
    let sum = 0;
    empData.map((e) => {
      sum += e.salary;
    });
    let num: number = empData.length;
    return `The total and average salary of all the employees is ${sum} and ${(sum / num).toFixed(2)}`;
  }

  //Get Paginated

  async getPaginated(page: number) {
    const empData: empInterface[] = await this.EmployeeModel.find().limit(3).skip(3 * (page - 1));
    return empData;
  }

  //Get Dynamic fields

  async getFieldSorted(id: number, field: string) {
    if (id !== 1 && id !== -1) throw new Error('Invalid id');
    const empData: empInterface[] = await this.EmployeeModel.find().sort({ [field]: id });
    return empData;
  }
}
