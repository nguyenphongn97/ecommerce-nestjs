import { comparePasswordHelper } from '@/helpers/utils';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    global: true
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await comparePasswordHelper(pass, user?.password);
    if (!user || !isValidPassword) return null;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  handleRegister = async(registerDto: RegisterDto) => {
    return this.usersService.handleRegister(registerDto);
  }

  // Trước khi dùng thư viện
  // async signIn(username: string, pass: string): Promise<any> {
  //   global: true
  //   const user = await this.usersService.findByEmail(username);
  //   const isValidPassword = await comparePasswordHelper(pass, user?.password);

  //   if (!isValidPassword) {
  //     throw new UnauthorizedException("username/password không hợp lệ");
  //   }
  //   const payload = { sub: user._id, username: user.email };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
