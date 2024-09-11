import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }
}
