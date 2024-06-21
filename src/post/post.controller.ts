import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  postRoute(): string {
    return this.postService.sendDemo();
  }

  @Post('create')
  createEmp(@Body() emp: { name: string }): string {
    return this.postService.createEmp(emp);
  }
}
