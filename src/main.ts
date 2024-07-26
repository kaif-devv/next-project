import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  log(`Server started on ${await app.getUrl()}`);
}
bootstrap();
