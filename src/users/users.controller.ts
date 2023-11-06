import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async registerUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
