import { Injectable } from '@nestjs/common';
import { empSchema, loginSchema } from '../interfaces';
import * as path from 'path';
import * as fs from 'fs';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class PostService {
  constructor(private readonly shared: SharedService) {}
  sendDemo(): string {
    let x = 'hi';
    return this.shared.getShared(x);
  }

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
        performance: '4',
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
    //Finding the exact employee to get prev password
    let prevPass = empJson.find((e) => e.email === info.email).password;
    let proceed = this.shared.verifyPass(info.password, prevPass);
    let token = this.shared.gToken(info.email);
    if(proceed) return token
      else return null
  }
}
