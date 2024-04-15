import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Test API')
  .setDescription('Description')
  .setVersion('1.0')
  .build();
