import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Dragon Force API')
    .setDescription('API para gestionar la plataforma Dragon Force FC Porto')
    .setVersion('1.0')
    .addTag('hero-slider', 'Gestión de slides del hero')
    .addTag('news', 'Gestión de noticias')
    .addTag('events', 'Gestión de eventos')
    .addTag('schools', 'Gestión de escuelas')
    .addTag('international-programs', 'Gestión de programas internacionales')
    .addTag('quality-carousel', 'Gestión del carrusel de calidad')
    .addTag('train-champions', 'Gestión de opciones de entrenamiento')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();

