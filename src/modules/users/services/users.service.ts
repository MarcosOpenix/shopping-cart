import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/users.dto';
import { LEVEL_AUTHORIRY } from 'src/constants/levelAuthority';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      const newUser = {
        ...body,
        activated: body.activated ?? true,
        levelAuthority: body.levelAuthority ?? LEVEL_AUTHORIRY.CLIENT,
      };
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
