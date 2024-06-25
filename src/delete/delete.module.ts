import { Module } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [DeleteController],
  providers: [DeleteService],
})
export class DeleteModule {}
