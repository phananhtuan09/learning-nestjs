import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'config/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Create an instance of ConfigService
  const configService = app.get(ConfigService);
  // Get the port from environment variables
  const port = configService.get<number>('PORT', 3000);

  // Config Prefix
  app.setGlobalPrefix('api');

  // Config Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  console.log(
    `Server is running on http://localhost:${port}\nTest API in http://localhost:${port}/swagger`,
  );
}
bootstrap();
