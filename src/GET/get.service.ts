import { Injectable } from '@nestjs/common';
import { empInterface, historyInterface } from 'src/interfaces';
import { SharedService } from 'src/shared/shared.service';
import * as csvJSON from 'csvjson';
import * as path from 'path';
import * as fs from 'fs';
import { share } from 'rxjs';
@Injectable()
export class GetService {
  constructor(private readonly shared: SharedService) {}

  // static variable to get the employee data using the service getjson()

  //Get eployee by ID
  getById(id: number): empInterface {
    const empData: empInterface[] = this.shared.getJson();

    let ind: number = empData.findIndex((e) => e.id === id);
    return empData[ind];
  }

  //Get employee by name
  getByName(name: string): empInterface[] {
    const empData: empInterface[] = this.shared.getJson();

    let data = empData.filter((e) => e.name === name);
    return data;
  }

  //Get minimum and maximum salary for the department
  getDptSal(dpt: string) {
    const empData: empInterface[] = this.shared.getJson();

    let filtered = empData.filter((e) => e.department === dpt);
    filtered.sort((a, b) => b.salary - a.salary);
    let maxSal: number = filtered[0].salary;
    let minSal: number = filtered[filtered.length - 1].salary;
    return `The max and min salary of department ${dpt} is ${maxSal} and ${minSal}`;
  }

  //No of emp in DPT
  getDptCount(dpt: string) {
    const empData: empInterface[] = this.shared.getJson();

    let filtered = empData.filter((e) => e.department === dpt);
    return `The number of employees in a department are ${filtered.length}`;
  }

  getDpt(dpt: string) {
    const empData: empInterface[] = this.shared.getJson();

    let data: empInterface[] = empData.filter((e) => e.department === dpt);
    if (data.length === 0) return `No employees in the department ${dpt}`;
    return data;
  }

  //Get by perfoemance

  getByPer(per: number) {
    const empData: empInterface[] = this.shared.getJson();

    let data = empData.filter((e) => e.performance >= per);
    if (data.length === 0) return 'no employee with the performance range';
    return data;
  }

  //Get top three employees by Sal
  getTopThree() {
    const empData: empInterface[] = this.shared.getJson();

    let empJSON = empData;
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
    const empData: empInterface[] = this.shared.getJson();

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
  getAvg() {
    const empData: empInterface[] = this.shared.getJson();

    let sum = 0;
    empData.map((e) => {
      sum += e.salary;
    });
    let num: number = empData.length;
    return `The total and average salary of all the employees is ${sum} and ${(sum / num).toFixed(2)}`;
  }

  //Get Paginated

  getPaginated(page: number) {
    const empData: empInterface[] = this.shared.getJson();

    empData.sort((a, b) => a.id - b.id);
    let data = empData.slice(3 * (page - 1), 3 * page);
    return data;
  }

  //Get Dynamic fields

  getFieldSorted(id: number, field: string) {
    const empData: empInterface[] = this.shared.getJson();

    if (id === 1) {
      let data = empData.sort((a, b) => a[field] - b[field]);
      return data;
    } else if (id === -1) {
      return empData.sort((a, b) => b[field] - a[field]);
    } else return 'Enter the correct parameters ';
  }

  //Get CSV data
  geCsv() {
    const empData: empInterface[] = this.shared.getJson();

    let downloadPath: string = path.join(__dirname, '../../DATA/report.csv');
    const empJSON: empInterface[] = empData;
    const dptObj: { [key: string]: number[] } = {};
    empJSON.map((e: { department: string }) => {
      dptObj[e.department] = [];
    });

    empJSON.map((e: { department: string; salary: any }) => {
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
    const csvData = csvJSON.toCSV(JSON.stringify(csvObj), { headers: 'key' });
    fs.writeFileSync(downloadPath, csvData);
    return csvData;
  }

  //Get History
  getHistory(id: number) {
    let historyJson: historyInterface[] = this.shared.getHistory();
    let data = historyJson.filter((e) => e.id === id);
    return data[data.length - 1];
  }
}
