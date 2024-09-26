import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/users.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('create')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }
}
