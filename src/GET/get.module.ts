import {
  MiddlewareConsumer,
  RequestMethod,
  Module,
  NestModule,
} from '@nestjs/common';

import { GetController } from './get.controller';
import { GetService } from './get.service';
import { SharedModule } from 'src/shared/shared.module';
import { jwtVerify } from 'src/shared/shared.middleware';

@Module({
  imports: [SharedModule],
  controllers: [GetController],
  providers: [GetService],
})

export class GetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(jwtVerify).forRoutes(GetController);
  }
}
