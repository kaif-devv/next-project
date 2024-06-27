import {  Module} from '@nestjs/common';
import { SharedService } from './shared.service';
import { jwtVerify } from './shared.middleware';
@Module({
  providers: [SharedService,jwtVerify],
  exports: [SharedService],
})
export class SharedModule {
}
