import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.user({ username });
    if (!user) throw NotFoundException;

    user.encryptedPassword =
  }
}
