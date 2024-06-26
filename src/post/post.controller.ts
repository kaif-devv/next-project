import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { empSchema, loginSchema } from '../interfaces';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('trial')
  postRoute(): string {
    return this.postService.sendDemo();
  }

  @Post('create')
  createEmp(@Body() emp: empSchema): string {
    return this.postService.createEmp(emp);
  }
@Post('login')
  login(@Body() info: loginSchema) {
    let token = this.postService.login(info);
    if (token) {
      return `Login Success the token is ${token}`;
    } else {
      return `incorrect credentials`;
    }
  }
}
