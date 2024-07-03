import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { PostService } from './post.service';
import { empInterface, loginInterface } from '../interfaces';
import { DataValidationPipe, FiledsExistPipe } from 'src/shared/validation.pipe';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  //Create Route for new employee
  @Post('create')
  @UsePipes(new FiledsExistPipe(), new DataValidationPipe())
  createEmp(@Body() emp: empInterface): string {
    return this.postService.createEmp(emp);
  }
  //Login route to generate the token
  @Post('login')
  login(@Body() info: loginInterface) {
    let promise = this.postService.login(info);
    return promise;
  }

  //testing route
  @Post('temp')
  try() {
    return this.postService.mdwService();
  }

  // VALIDATION PIPE TEST
  @Post('pipe')
  @UsePipes(new DataValidationPipe())
  test(@Body() emp: string) {
    return 'PIPE WORKING';
  }
}
