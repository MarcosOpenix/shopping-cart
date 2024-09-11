import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UsersEntity } from './users.entity';
import { BaseEntity } from 'src/config/base.entity';

@Entity('wallets')
export class WalletsEntity extends BaseEntity {
  @Column()
  balance: number;

  @Column()
  moneyType: string;

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
