import { Body, Controller, Get, Post, Query ,Headers,Param} from '@nestjs/common';
import { PostService } from './post.service';
import { empSchema } from '../interfaces';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('trial')
  postRoute(): string {
    return this.postService.sendDemo(); // shared service
  }

  @Post('create')
  createEmp(@Body() emp: empSchema): string {
    return this.postService.createEmp(emp);
  }

  @Get('qry')
  getQ(@Query() nm: any){
    let name = nm.nm;
    return `The name is ${name}`
  }

  @Get(':que')
  getQuery(@Param('que') name: any) {
    return `Query Parameter:${name}`;
  }


  @Get('head')
  getHead(@Headers() header: any) {
    return `The header is ${JSON.stringify(header.jwt)}`;
  }
}
