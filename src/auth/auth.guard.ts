import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()

export class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let flag = false;
    // Accessing a header value
    const token = request.headers['jwt_key'];

    if (!token) {
      throw new HttpException(
        'Authorization token is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (error: Error) {
      if (error) {
        throw new HttpException(
          'Invalid user',
          HttpStatus.UNAUTHORIZED,
        );
      }
      flag = true;
    });
    return flag;
  }
}
