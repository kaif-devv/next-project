import { Injectable } from '@nestjs/common';
import { empSchema, loginSchema } from '../interfaces';
import * as path from 'path';
import * as fs from 'fs';
import { SharedService } from 'src/shared/shared.service';
import { EmpSchema } from 'src/Schemas/emp.schema';
@Injectable()
export class PostService {
  employeeModel: any;
  constructor(private readonly shared: SharedService) {}
  createEmp(emp: empSchema): string {
    try {
      const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
      const empJSON: empSchema[] = this.shared.getJson();
      let proceed = empJSON.findIndex((e) => e.email === emp.email);
      if (proceed !== -1) {
        return 'Employee with this email already exists';
      }
      const newId: number =
        empJSON.length > 0 ? empJSON[empJSON.length - 1].id + 1 : 1;
      const hashed = this.shared.hashPassword(emp.password);
      let newEmp = {
        name: emp.name,
        age: emp.age,
        email: emp.email,
        id: newId,
        position: emp.position,
        salary: emp.salary,
        password: hashed,
        department: emp.department,
        performance: 3.5,
      };
      empJSON.push(newEmp);
      fs.writeFileSync(jsonFilePath, JSON.stringify(empJSON));
      return `the employee has been created`;
    } catch (error) {
      return error;
    }
  }

  login(info: loginSchema) {
 
    let empJson = this.shared.getJson();
    //Finding the exact employee to get prev 
    let user = empJson.find((e) => e.email === info.email);
    if(!user) return 'Invalid email address'
    let prevPass = user.password;
    let proceed = this.shared.verifyPass(info.password, prevPass);
    let token = this.shared.gToken(info.email);
    if (proceed) {
      return `Login Success the token is ${token}`;
    } else {
      return 'Invalid Credentials';
    }
  }
//test
  mdwService(){
    return true
  }

  async sendMongo(emp: empSchema): Promise<typeof EmpSchema> { // Changed return type
    const newEmp = new this.employeeModel(emp);
    return newEmp.save();
  }
}
