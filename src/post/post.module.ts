import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SharedModule } from 'src/shared/shared.module';
import { fieldsMW,nameMW,passMW,ageMW,dptMW,posMW,perfMW } from 'src/shared/shared.middleware';

@Module({
  imports: [SharedModule],
  controllers: [PostController],
  providers: [PostService],
})

export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(fieldsMW,nameMW,passMW,ageMW,dptMW,posMW,perfMW)
      .forRoutes('create');
  }
}
