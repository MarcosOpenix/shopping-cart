import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { LEVEL_AUTHORIRY } from 'src/constants/levelAuthority';
import { OrdersEntity } from 'src/modules/orders/entities/orders.entity';
import { WalletsEntity } from './Wallets.entity';
import { TransactionsEntity } from 'src/modules/orders/entities/transactions.entity';
import { ShoppingSessionsEntity } from 'src/modules/cart/entities/shopping-session.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
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

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];

  @OneToOne(() => WalletsEntity, (wallets) => wallets.user)
  wallet: WalletsEntity;

  @OneToMany(() => TransactionsEntity, (transactions) => transactions.user)
  transactions: TransactionsEntity[];

  @OneToMany(
    () => ShoppingSessionsEntity,
    (shoppingSessions) => shoppingSessions.user,
  )
  shoppingSessions: ShoppingSessionsEntity[];
}
