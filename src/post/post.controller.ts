import { Controller, Get, Post } from "@nestjs/common";
import { PostService } from "./post.service";

@Controller()

export class PostController{
    constructor(private readonly postService: PostService) {}
    @Get()
    postRoute():string {
        return this.postService.sendDemo();
    }

    @Get('create')
    createFile(): string{
        return this.postService.createFile();
    }

    @Get('dsds')
    dsds(): string{
        return this.postService.demo();
    }

}