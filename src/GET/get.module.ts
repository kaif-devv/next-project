import { Module } from '@nestjs/common';
import { GetController } from './get.controller';
import { GetService } from './get.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports :[SharedModule],
    controllers: [GetController],
    providers:[GetService]
})
export class GetModule {}
