import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PostService {
  sendDemo(): string {
    return 'Post route demo';
  }

  createFile(): string {
    const dirPath = path.join(__dirname, '../../DATA');
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
    if (!fs.existsSync(jsonFilePath)) {
      fs.writeFileSync(jsonFilePath, '[]');
      return 'file created successfully';
    } 
  }

  demo(): string {
    let dsds: string = this.createFile();
    return dsds;
  }
}
