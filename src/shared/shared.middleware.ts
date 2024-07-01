import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import { SharedService } from './shared.service';
// // import * as jwt from 'jsonwebtoken';

@Injectable()
export class fileExistMW implements NestMiddleware {
  // constructor(private readonly shared: SharedService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const jsonFilePath = path.join(__dirname, '../../DATA/myFiles.json');
    try {
      require.resolve(jsonFilePath);
      next();
    } catch (error) {
      res.send('File does not exist');
    }
  }
}


// export class fieldsMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const { name, age, email, password, salary, position, department } =
//       req.body;
//     if (
//       !name ||
//       !age ||
//       !position ||
//       !password ||
//       !salary ||
//       !email ||
//       !department
//     ) {
//       res.send('All fields are required');
//     } else {
//       next();
//     }
//   }
// }

// export class nameMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     let name = req.body.name;
//     if (!name) return next();
//     if (name.charAt(0) <= '9') {
//       res.send('Name should start with a letter');
//     } else {
//       return next();
//     }
//   }
// }

// export class passMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const password: any = req.body.password;
//     if (!password) {
//       return next();
//     }
//     const specialCharRegex: any = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//     let capitalFlag: boolean = false;
//     let numFlag: boolean = false;
//     let smallFlag: boolean = false;
//     let specialFlag: boolean = false;

//     for (let i = 0; i < password.length; i++) {
//       const char: string = password[i];
//       if (/[A-Z]/.test(char)) {
//         capitalFlag = true;
//       } else if (/[a-z]/.test(char)) {
//         smallFlag = true;
//       } else if (/[0-9]/.test(char)) {
//         numFlag = true;
//       } else if (specialCharRegex.test(char)) {
//         specialFlag = true;
//       }
//     }
//     if (!capitalFlag || !numFlag || !specialFlag || !smallFlag) {
//       res.send(
//         'Password must include uppercase, lowercase, number, and special character',
//       );
//     } else {
//       return next();
//     }
//   }
// }

// export class ageMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const age: number = req.body.age;
//     if (!age) {
//       return next();
//     }
//     if (age < 18 || age > 60) {
//       res.send('Enter the correct age');
//     } else {
//       return next();
//     }
//   }
// }

// type Department = 'frontend' | 'backend' | 'fullstack';
// export class dptMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const department: Department = req.body.department;
//     if (!department) {
//       return next();
//     }
//     const validDepartments: Department[] = ['frontend', 'backend', 'fullstack'];
//     if (!validDepartments.includes(department)) {
//       res.send('Enter the correct department');
//     } else {
//       return next();
//     }
//   }
// }

// export class posMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const position: string = req.body.position;
//     if (!position) {
//       return next();
//     }
//     if (position !== 'SDE1' && position !== 'SDE2' && position !== 'SDE3') {
//       res.send('Enter the correct position');
//     } else {
//       return next();
//     }
//   }
// }

// export class perfMW implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const performance: number = req.body.performance;
//     if (!performance) {
//       return next();
//     }
//     if (performance > 5 || performance < 0) {
//       res.send('Enter the performance rating between 0 and 5');
//     } else {
//       return next();
//     }
//   }
// }

// // export class jwtVerify implements NestMiddleware {
// //   use(req: Request, res: Response, next: NextFunction) {
// //     const token: string = req.header('jwt_key');
// //     jwt.verify(token, process.env.JWT_SECRET_KEY, function (error) {
// //       if (error) {
// //         res.send('Invalid  or wrong credentials');
// //       } else {
// //         return next();
// //       }
// //     });
// //   }
// // }
