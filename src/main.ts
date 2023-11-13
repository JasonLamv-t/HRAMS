import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';

async function bootstrap() {
  const winstonTransportsConfig = [
    new transports.DailyRotateFile({
      filename: 'logs/api-error-%DATE%.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '45d',
    }),
    new transports.DailyRotateFile({
      filename: `logs/api-all-%DATE%.log`,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ];

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: winstonTransportsConfig,
    }),
  });
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HRAMS')
    .setDescription('Human Resource Archives Management System for Colourlife')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(config.get<number>('port', 3000));
}

bootstrap();
