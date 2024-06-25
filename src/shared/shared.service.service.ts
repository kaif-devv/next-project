import { Injectable } from '@nestjs/common';
import { empSchema } from 'src/interfaces';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class SharedService {
  // Demo test
  getShared(x: string): string {
    return `shared data is ${x}`;
  }

  dataPath(){
  const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
  return jsonFilePath
  }
  
  // Accessing Json Data
  getJson() {
    const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
    const empJSON: empSchema[] = require(jsonFilePath);
    return empJSON;
  }

  //Bcrypting password

  hashPassword(x: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(x, salt);
    return hash;
  }
}
