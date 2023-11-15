import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { redisStore } from 'cache-manager-redis-yet';
import configuration from '../config/configuration';
import { validationSchema } from '../config/validateSchema';

const envFilePath = [process.env.NODE_ENV, 'common'].map(
  (name) => `${process.cwd()}/src/config/env/${name}.env`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath,
      validationSchema,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('jwt.secret'),
        signOptions: { expiresIn: config.get<string>('jwt.ttl') },
      }),
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        isGlobal: true,
        store: await redisStore({
          url: config.get<string>('redis.url'),
          ttl: config.get<number>('redis.ttl'),
        }),
      }),
    }),
  ],
  exports: [JwtModule, CacheModule],
})
export class CoreModule {}
