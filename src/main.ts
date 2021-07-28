import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true //우리가 원하는 타입으로 알아서 바꿔줌 url에 들어가는 건 기본적으로 전부 string이 된다
    }));
  await app.listen(3000);
}
bootstrap();
