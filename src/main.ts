import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //este comando ignora los campos extras al request
    whitelist: true,
    //este comando envia un error si en el request hay campoos extra
    forbidNonWhitelisted: true,
  }))
  await app.listen(3000);
}
bootstrap();
