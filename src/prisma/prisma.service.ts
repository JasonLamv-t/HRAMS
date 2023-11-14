import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>('databaseUrl');
    if (!databaseUrl)
      throw new InternalServerErrorException('缺少配置项 databaseUrl');
    super({ datasources: { db: { url: databaseUrl } } });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
