import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { runMigrations } from '../db/migration-runner';
import { WebSocketAdapter } from './chat/gateway.adpater';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { DiscordExceptionFilter } from 'utils/filters/discord-exception.filter';
import { DiscordService } from './discord/discord.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Main');
  const { PORT } = process.env;
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const apiConfig = new DocumentBuilder()
    .setTitle('Nexcom API')
    .setDescription('The offical Nexcom API documentation')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, apiConfig);
  process.env.NODE_ENV === 'development' &&
    SwaggerModule.setup('swagger', app, documentFactory);
  const webSocketAdapter = app.get(WebSocketAdapter);
  app.useWebSocketAdapter(webSocketAdapter);
  app.useGlobalFilters(new DiscordExceptionFilter(app.get(DiscordService)));
  app.enableCors({ origin: configService.get<string>('CORS_ORIGIN') });
  runMigrations();

  try {
    await app.listen(PORT, () => {
      logger.log(`Running on Port ${PORT}`);
      logger.log(`Running in ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    logger.error(err);
  }
}
bootstrap();
