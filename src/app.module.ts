import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpModule } from './emp/emp.module';
import { TestModule } from './test/test.module';
import { JwtGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/',{dbName: 'Nest'}), EmpModule, TestModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
  ],
})
export class AppModule {}
