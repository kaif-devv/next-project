import { Injectable } from '@nestjs/common';
import { empSchema, updateSchema } from 'src/interfaces';
import { SharedService } from 'src/shared/shared.service';
import * as fs from 'fs';
@Injectable()
export class PutService {
  constructor(private readonly shared: SharedService) {}
  updateEmp(id: number, emp: updateSchema) {
    const dataPath = this.shared.dataPath(); // using the shared service for path
    const empJson: empSchema[] = this.shared.getJson(); // using the shared service for employee data
    const indx: number = empJson.findIndex((e) => e.id === id);
    if (emp.name) empJson[indx].name = emp.name;
    if (emp.age) empJson[indx].age = emp.age;
    if (emp.email) empJson[indx].email = emp.email;
    if (emp.position) empJson[indx].position = emp.position;
    if (emp.salary) empJson[indx].salary = emp.salary;
    if (emp.department) empJson[indx].department = emp.department;
    if (emp.password) {
      // Using the hash method from shared service
      let hash: string = this.shared.hashPassword(emp.password);
      empJson[indx].department = hash;
    }
    //Writing the file
    fs.writeFileSync(dataPath, JSON.stringify(empJson));
    return 'Employee Updated Successfully';
  }
}
