import { Module } from '@nestjs/common';
import { GetModule } from './GET/get.module';
import { PostModule } from './post/post.module';
import { PutModule } from './put/put.module';
import { DeleteModule } from './delete/delete.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpModule } from './emp/emp.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/',{dbName: 'Root'}), GetModule, PostModule, PutModule, DeleteModule, EmpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
