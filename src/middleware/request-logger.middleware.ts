import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();
  private isProduction: boolean = false;

  constructor(private config: ConfigService) {
    this.isProduction = config.get<string>('NODE_ENV') === 'production';
  }

  use(req: Request, res: Response, next: NextFunction) {
    if (!this.isProduction) {
      this.logger.log(`[${req.method}] ${req.originalUrl} %j}`, {
        headers: req.headers,
        query: req.query,
        body: req.body,
      });
    }

    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode >= 400 && statusCode < 500) {
        this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
      }
    });

    next();
  }
}
