import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pizza,pizzaSchema } from './schema/pizzaSchema';
@Module({
  imports:[MongooseModule.forFeature([{name: Pizza.name, schema: pizzaSchema}])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
