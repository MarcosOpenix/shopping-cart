import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/users.dto';
import { LEVEL_AUTHORITY } from 'src/constants/levelAuthority';
import { WalletsEntity } from '../entities/Wallets.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(WalletsEntity)
    private readonly walletRepository: Repository<WalletsEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    const { email } = body;
    const exist = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (exist) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }
    const newUser = {
      ...body,
      activated: body.activated ?? true,
      levelAuthority: body.levelAuthority ?? LEVEL_AUTHORITY.CLIENT,
    };
    const result = await this.userRepository.save(newUser);
    if (result.levelAuthority === LEVEL_AUTHORITY.CLIENT) {
      const newWallet = {
        user: result,
        moneyType: 'usd',
        balance: 5000,
      };
      await this.walletRepository.save(newWallet);
    }

    return result;
  }

  public async findOne(email: string): Promise<UsersEntity> {
    const exist = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    return exist;
  }

  public async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
