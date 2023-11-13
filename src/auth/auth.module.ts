import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, UsersService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
