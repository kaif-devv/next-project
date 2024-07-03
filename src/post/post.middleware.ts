import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PostService } from './post.service';
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


//TESTING MIDDLEWARE USING THE SERVICE
@Injectable()
export class testMDW implements NestMiddleware{
  constructor(private readonly shared:PostService){}
  async use(req: any, res: any, next: (error?: any) => void) {
    let i = await this.shared.mdwService();
    if(i) res.send("WORKING")
      else res.send("NOT WORKING")
  }
  
}
