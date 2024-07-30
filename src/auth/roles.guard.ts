import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
  
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles){
      return true;
    }
    const user = request.user;
    console.log("🚀 ~ RolesGuard ~ canActivate ~ user:", user);
    console.log('Roles:', roles)
    if (!roles.includes(user.role)) {
      throw new HttpException('User does not have the required role', HttpStatus.FORBIDDEN);
    }

    return true;
  }   
}
