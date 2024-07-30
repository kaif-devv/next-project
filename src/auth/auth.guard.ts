import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Reflector } from '@nestjs/core';

dotenv.config();

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }
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
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (error: Error, decoded: any) {
        if (error) {
          throw new HttpException('Invalid user', HttpStatus.UNAUTHORIZED);
        }
        flag = decoded;
      },
    );
    request.user = flag;
    return flag ? true : false;
  }
}
