import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class historyfileMW implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dirPath = path.join(__dirname, '../../DATA');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const historyFilePath = path.join(__dirname, '../../DATA/history.json');
    if (!fs.existsSync(historyFilePath)) {
      fs.writeFileSync(historyFilePath, '[]');
    }
    next();
  }
}
