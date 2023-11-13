import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: '姓名', example: '刘强' })
  @MaxLength(36, { message: '姓名长度不能大于 36 位' })
  @IsNotEmpty({ message: '姓名不能为空' })
  readonly realName!: string;

  @ApiProperty({ description: '用户名', example: 'liuqiang' })
  @MaxLength(36, { message: '用户名长度不能大于 36 位' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username!: string;

  @ApiProperty({ description: '密码', example: 'Password123' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '密码必须包含大小写字母和数字',
  })
  @MaxLength(24, { message: '密码长度不能大于 24 位' })
  @MinLength(8, { message: '密码长度不能小于 8 位' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password!: string;
}
