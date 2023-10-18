import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import dataSource from 'config/data-source';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

dataSource
  .initialize()
  .then(() => {})
  .catch((error) => console.log(error));
