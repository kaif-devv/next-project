import {  Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  sendDemo(): string {
    return 'Post route demo';
  }

  createEmp(emp: {name:string}): string {
    // const jsonFilePath = path.join(__dirname, "../DATA/myFiles.json");
    // const empJSON: empSchema[] = require(jsonFilePath);
    return `the name is ${emp.name}`;
  }
}
