import { Injectable } from '@nestjs/common';
import { empInterface, historyInterface } from 'src/interfaces';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SharedService {
  // Demo test
  getShared(x: string): string {
    return `shared data is ${x}`;
  }

  dataPath() {
    const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
    return jsonFilePath;
  }

  historyPath(){
    const historyPath = path.join(__dirname, '../../DATA/history.json');
    return historyPath;
  }

  // Accessing Json Data
  getJson() {
    
      const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
      const empJSON: empInterface[] = require(jsonFilePath);
      return empJSON;
  }

  getHistory() {
    
    const history = path.join(__dirname, '../../DATA/history.json');
    const historyJSON: historyInterface[] = require(history);
    return historyJSON;
}

  //Bcrypting password

  hashPassword(x: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash: string = bcrypt.hashSync(x, salt);
    return hash;
  }

  //Verify Password

  verifyPass(currPass: string, dbPass: string) {
    let proceed = bcrypt.compareSync(currPass, dbPass);
    return proceed;
  }

  //generate Token
  gToken(email: string) {
    try {
      let i = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
      return i;
    } catch (error) {
      return `Error Occured: ${error}`;
    }
  }
}
