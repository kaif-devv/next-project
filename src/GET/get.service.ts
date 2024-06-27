import { Injectable } from '@nestjs/common';
import { empSchema } from 'src/interfaces';
import { SharedService } from 'src/shared/shared.service';

@Injectable()
export class GetService {
  constructor(private readonly shared: SharedService) {}

  // static variable to get the employee data using the service getjson()
  empData: empSchema[] = this.shared.getJson();

  //Get eployee by ID
  getById(id: number): empSchema {
    let ind = this.empData.findIndex((e) => e.id === id);
    return this.empData[ind];
  }

  //Get employee by name
  getByName(name: string): empSchema[] {
    let data = this.empData.filter((e) => e.name === name);
    return data;
  }

  //Get minimum and maximum salary for the department
  getDptSal(dpt: string) {
    let filtered = this.empData.filter((e) => e.department === dpt);
    filtered.sort((a, b) => b.salary - a.salary);
    console.log(filtered);
    let maxSal: number = filtered[0].salary;
    let minSal: number = filtered[filtered.length - 1].salary;
    return `The max and min salary of department ${dpt} is ${maxSal} and ${minSal}`;
  }
  //No of emp in DPT
  getDptCount(dpt: string) {
    let filtered = this.empData.filter((e) => e.department === dpt);
    return `The number of employees in a department are ${filtered.length - 1}`;
  }

  //Get by perfoemance

  getByPer(per:number) {
    let data = this.empData.filter((e) => e.performance >= per);
    if (data.length === 0) return 'no employee with the performance range';
    return data;
  }
}
