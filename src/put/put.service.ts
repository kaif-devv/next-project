import { Injectable } from '@nestjs/common';
import { empInterface, historyInterface, updateInterface } from 'src/interfaces';
import { SharedService } from 'src/shared/shared.service';
import * as fs from 'fs';
@Injectable()
export class PutService {
  constructor(private readonly shared: SharedService) {}
  updateEmp(id: number, updateEmployee: updateInterface) {
    const dataPath = this.shared.dataPath(); // using the shared service for history path
    const historyPath = this.shared.historyPath(); // using the shared service for history path   
    const empJSON: empInterface[] = this.shared.getJson(); // using the shared service for employee data
    const empHistory: historyInterface[] = this.shared.getHistory(); // using the shared service for employee data
    
    const empHistoryId: number =
    empHistory.length > 0
      ? empHistory[empHistory.length - 1].empHistoryId + 1
      : 1;
  const updatedOBJ: historyInterface = {
    id: id,
    empHistoryId: empHistoryId,
    updatedOn: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }),
  };

    const index: number = empJSON.findIndex((e) => e.id === id);
    if (index === -1) return 'Employee doesnt exists with that id';
    if (updateEmployee.name) {
      updatedOBJ.name = {
        prevName: empJSON[index].name,
        currentName: updateEmployee.name,
      };
      empJSON[index].name = updateEmployee.name;
    }
    if (updateEmployee.salary) {
      updatedOBJ.salary = {
        prevSalary: empJSON[index].salary,
        currentSalary: updateEmployee.salary,
      };
      empJSON[index].salary = updateEmployee.salary;
    }
    if (updateEmployee.age) {
      updatedOBJ.age = {
        prevAge: empJSON[index].age,
        currentAge: updateEmployee.age,
      };
      empJSON[index].age = updateEmployee.age;
    }
    if (updateEmployee.department) {
      updatedOBJ.department = {
        prevDpt: empJSON[index].department,
        currentDpt: updateEmployee.department,
      };
      empJSON[index].department = updateEmployee.department;
    }
    if (updateEmployee.position) {
      updatedOBJ.position = {
        prevPosition: empJSON[index].position,
        currentPosition: updateEmployee.position,
      };
      empJSON[index].position = updateEmployee.position;
    }
    if (updateEmployee.performance) {
      updatedOBJ.performance = {
        prevPerformance: empJSON[index].performance,
        currentPerformance: updateEmployee.performance,
      };
      empJSON[index].performance = updateEmployee.performance;
    }
    if (updateEmployee.email) {
      let ei = empJSON.findIndex(
        (elem: { email: any }) => elem.email === updateEmployee.email
      ); //1
      if (ei !== -1 && ei !== index)
        return ("Employee with this email already exists");
      else {
        updatedOBJ.email = {
          prevEmail: empJSON[index].email,
          currentEmail: updateEmployee.email,
        };
        empJSON[index].email = updateEmployee.email;
      }
    }
    if (updateEmployee.password) {
      // Using the hash method from shared service
      let hash: string = this.shared.hashPassword(updateEmployee.password);
      empJSON[index].department = hash;
    }
    empHistory.push(updatedOBJ);
    //Writing the file
    fs.writeFileSync(historyPath, JSON.stringify(empHistory));
    fs.writeFileSync(dataPath, JSON.stringify(empJSON));
    return 'Employee Updated Successfully';
  }
}
