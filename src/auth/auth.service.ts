import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly saltOrRounds: number = 10;

  constructor(
    private readonly user: UsersService,
    private readonly config: ConfigService,
  ) {}

  async signUp(sighUpDto: SignUpDto) {
    const { realName, username, password } = sighUpDto;

    const existUser = await this.user.getOne({ username });

    if (existUser) throw new ConflictException(`用户 ${username} 已存在`);
    const encryptedPassword = bcrypt.hashSync(password, this.saltOrRounds);

    return this.user.create({ realName, username, encryptedPassword });
  }
}
