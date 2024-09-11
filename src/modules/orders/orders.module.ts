import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';
import { OrderItemsEntity } from './entities/order-items.entity';
import { TransactionsEntity } from './entities/transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,
      OrderItemsEntity,
      TransactionsEntity,
    ]),
  ],
})
export class OrdersModule {}
