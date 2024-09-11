import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ORDER_STATUS } from 'src/constants/orderStatus';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'transactions' })
export class TransactionsEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => OrdersEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrdersEntity;

  @Column()
  orderStatus: ORDER_STATUS;

  @Column()
  totalPrice: number;
}
