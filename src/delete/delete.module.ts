import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';
import { SharedModule } from 'src/shared/shared.module';
import { jwtVerify } from 'src/shared/shared.middleware';
@Module({
  imports: [SharedModule],
  controllers: [DeleteController],
  providers: [DeleteService],
})
export class DeleteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(jwtVerify).forRoutes('delete');
  }
}
