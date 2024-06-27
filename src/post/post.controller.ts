import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { empSchema, loginSchema } from '../interfaces';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  //Create Route for new employee
  @Post('create')
  createEmp(@Body() emp: empSchema): string {
    return this.postService.createEmp(emp);
  }
  //Login route to generate the token
  @Post('login')
  login(@Body() info: loginSchema) {
    let promise = this.postService.login(info);
    return promise;
  }

  //testing route
  @Post('temp')
  try() {
    return this.postService.mdwService();
  }
}
