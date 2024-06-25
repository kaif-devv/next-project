import { Injectable } from '@nestjs/common';
import { empSchema } from '../interfaces';
import * as path from 'path';
import * as fs from 'fs';
import { SharedService } from 'src/shared/shared.service.service';

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
}
