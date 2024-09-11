import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { TransactionsEntity } from './transactions.entity';
import { OrderItemsEntity } from './order-items.entity';

@Entity({ name: 'orders' })
export class OrdersEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column()
  paymentType: string;

  @Column()
  orderStatus: string;

  @Column()
  totalPrice: number;

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.order)
  transactions: TransactionsEntity[];

  @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.order)
  orderItems: OrderItemsEntity[];
}
