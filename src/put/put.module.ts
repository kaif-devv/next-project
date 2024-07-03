import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PutService } from './put.service';
import { PutController } from './put.controller';
import { SharedModule } from 'src/shared/shared.module';
import { historyfileMW } from './put.middleware';

@Module({
  imports: [SharedModule],
  controllers: [PutController],
  providers: [PutService],
})
export class PutModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(historyfileMW).forRoutes('update')
  }
}
