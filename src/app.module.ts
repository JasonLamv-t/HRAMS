import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}