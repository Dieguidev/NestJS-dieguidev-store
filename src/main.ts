import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    //este comando ignora los campos extras al request
    whitelist: true,
    //este comando envia un error si en el request hay campoos extra
    forbidNonWhitelisted: true,
  }))

//codigo para swagger
  const config = new DocumentBuilder()
    .setTitle('Dieguidev-Store')
    .setDescription('The market API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //configurando cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
