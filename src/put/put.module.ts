import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PutService } from './put.service';
import { PutController } from './put.controller';
import { SharedModule } from 'src/shared/shared.module';
import { nameMW,passMW,ageMW,dptMW,posMW,perfMW } from 'src/shared/shared.middleware';

@Module({
  imports: [SharedModule],
  controllers: [PutController],
  providers: [PutService],
})
export class PutModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(nameMW,passMW,ageMW,dptMW,posMW,perfMW).forRoutes('update')
  }
}
