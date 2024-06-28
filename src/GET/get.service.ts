import { Injectable } from '@nestjs/common';
import { empSchema } from 'src/interfaces';
import { SharedService } from 'src/shared/shared.service';
import * as csvJSON from 'csvjson'
import * as path from 'path'
import * as fs from 'fs'
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
    return `The number of employees in a department are ${filtered.length}`;
  }

  getDpt(dpt:string) {
    let data = this.empData.filter((e) => e.department === dpt);
    if (data.length === 0) return `No employees in the department ${dpt}`;
    return data;
  }

  //Get by perfoemance

  getByPer(per: number) {
    let data = this.empData.filter((e) => e.performance >= per);
    if (data.length === 0) return 'no employee with the performance range';
    return data;
  }

  //Get top three employees by Sal
  getTopThree() {
    let empJSON = this.empData;
    let count = 0;
    empJSON.sort(
      (a: { salary: number }, b: { salary: number }) => b.salary - a.salary,
    );

    for (let i = 2; i < empJSON.length; i++) {
      if (empJSON[i].salary === empJSON[i + 1].salary) {
        continue;
      } else {
        count = i + 1;
        break;
      }
    }
    let arr = empJSON.slice(0, count);
    return arr;
  }

  //Get avg sal of all emp in dpt
  avgSal() {
    let empJSON = this.empData;
    const dptObj: { [key: string]: number[] } = {}; // Add index signature to dptObj
    empJSON.map((e: { department: string }) => {
      dptObj[e.department] = [];
    });
    empJSON.map((e: { department: string; salary: number }) => {
      dptObj[e.department].push(e.salary);
    });
    console.log(dptObj);

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
  getAvg() {
    let sum = 0;
    this.empData.map((e) => {
      sum += e.salary;
    });
    let num: number = this.empData.length;
    return `The total and average salary of all the employees is ${sum} and ${(sum / num).toFixed(2)}`;
  }

  //Get Paginated

  getPaginated(page: number) {
    this.empData.sort((a, b) => a.id - b.id);
    let data = this.empData.slice(3 * (page - 1), 3 * page);
    return data;
  }

  //Get Dynamic fields

  getFieldSorted(id: number, field: string) {
    if (id === 1) {
      let data = this.empData.sort((a, b) => a[field] - b[field]);
      return data;
    } else if (id === -1) {
      return this.empData.sort((a, b) => b[field] - a[field]);
    } else return 'Enter the correct parameters ';
  }

  //Get CSV data
  geCsv(){
    let downloadPath: string = path.join(__dirname, "../../DATA/report.csv");
    const empJSON: empSchema[] = this.empData 
    const dptObj: { [key: string]: number[] } = {};
    empJSON.map((e: { department: string  }) => {
      dptObj[e.department] = [];
    });

    empJSON.map((e: { department: string ; salary: any }) => {
      dptObj[e.department].push(e.salary);
    });
    let csvObj: {
      department: string;
      totalExpenditure: number;
      averageSal: number;
    }[] = [];

    Object.keys(dptObj).forEach((key) => {
      const salaries: number[] = dptObj[key];
      let sum = 0;
      for (let i = 0; i < salaries.length; i++) {
        sum += salaries[i];
      }
      let average = sum / salaries.length;
      csvObj.push({
        department: key,
        totalExpenditure: sum,
        averageSal: average,
      });
    });
    const csvData = csvJSON.toCSV(JSON.stringify(csvObj), { headers: "key" });
    fs.writeFileSync(downloadPath, csvData);
    return csvData;
  }

}
