import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user || user.activated === false) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    if (user.password != password) {
      throw new HttpException('Contraseña no valida', HttpStatus.BAD_REQUEST);
    }
    const payload = { id: user.id, email: user.email };
    const asd = await this.jwtService.decode('asdf', { json: true });
    return {
      access_token: await this.jwtService.signAsync(payload),
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      picture: user.picture,
      levelAuthority: user.levelAuthority,
    };
  }

  public async decodeToken(token: string) {
    return await this.jwtService.decode(token);
  }
}
