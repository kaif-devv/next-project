import { Module } from '@nestjs/common';
import { GetModule } from './GET/get.module';
import { PostModule } from './post/post.module';
import { PutModule } from './put/put.module';
import { DeleteModule } from './delete/delete.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/',{dbName: 'EmployeeDb'}), GetModule, PostModule, PutModule, DeleteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
