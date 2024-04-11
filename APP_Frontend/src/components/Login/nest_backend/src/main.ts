import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  if (
    process.env.NODE_ENV == 'development' ||
    process.env.NODE_ENV == 'staging'
  ) {
    const config = new DocumentBuilder()
      .setTitle(process.env.APP_NAME)
      .setDescription(`This is the API for ${process.env.APP_NAME}`)
      .addTag(process.env.APP_NAME)
      .setVersion('V1')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        persistAuthorization: true,
      },
    });
  }

  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`Server is running on port:- "${port}"`);
}

bootstrap();
