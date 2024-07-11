import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpModule } from './emp/emp.module';
import { TestModule } from './test/test.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/',{dbName: 'Nest'}), EmpModule, TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
