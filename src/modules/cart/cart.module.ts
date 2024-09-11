import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsEntity } from './entities/cart-items.entity';
import { ShoppingSessionsEntity } from './entities/shopping-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItemsEntity, ShoppingSessionsEntity]),
  ],
})
export class CartModule {}
