import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { omit } from 'lodash';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly saltOrRounds: number = 10;

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  async signUp(sighUpDto: SignUpDto) {
    const { realName, username, password } = sighUpDto;

    const existUser = await this.userService.getOne({ username });

    if (existUser) throw new ConflictException(`用户 ${username} 已存在`);
    const encryptedPassword = bcrypt.hashSync(password, this.saltOrRounds);

    const createdUser = this.userService.create({
      realName,
      username,
      encryptedPassword,
    });
    const payload = omit(createdUser, ['encryptedPassword']);
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const existUser = await this.userService.getOne({ username });
    if (!existUser) throw new UnauthorizedException('用户名或密码错误');

    const isMatch = bcrypt.hashSync(password, existUser.encryptedPassword);
    if (!isMatch) throw new UnauthorizedException('用户名或密码错误');

    const payload = omit(existUser, ['encryptedPassword']);
    const access_token = await this.jwtService.signAsync(payload);

    await this.cacheService.set(access_token, payload);
    return { access_token };
  }
}
