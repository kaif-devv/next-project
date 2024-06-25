import { Module } from '@nestjs/common';
import { GetModule } from './GET/get.module';
import { PostModule } from './post/post.module';
import { PutModule } from './put/put.module';
import { DeleteModule } from './delete/delete.module';

@Module({
  imports: [GetModule, PostModule,PutModule, DeleteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
