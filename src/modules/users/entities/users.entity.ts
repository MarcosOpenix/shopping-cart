import { BaseEntity } from 'src/config/base.entity';
import { IUser } from '../interfaces/user.interface';
import { Column, Entity } from 'typeorm';
import { LEVEL_AUTHORIRY } from 'src/constants/levelAuthority';

@Entity('users')
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ unique: true })
  email: string;
  @Column()
  picture: string;
  @Column()
  password: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @Column()
  address: string;
  @Column()
  activated: boolean;
  @Column({ type: 'enum', enum: LEVEL_AUTHORIRY })
  levelAuthority: LEVEL_AUTHORIRY;
}
