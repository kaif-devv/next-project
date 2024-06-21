import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class createFileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dirPath = path.join(__dirname, '../../DATA');
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }
    const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
    if (!fs.existsSync(jsonFilePath)) {
      fs.writeFileSync(jsonFilePath, '[]');
    } 
    next();
  }
}
