import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { createFileMiddleware } from './post.middleware';


@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(createFileMiddleware)
    .forRoutes('create')
  }
}
