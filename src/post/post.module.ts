import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SharedModule } from 'src/shared/shared.module';
import { createFileMiddleware, testMDW } from './post.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from 'src/Schemas/emp.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, testMDW],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(createFileMiddleware).forRoutes('create').apply(testMDW).forRoutes('temp'); // Testing middleware
  }
}
