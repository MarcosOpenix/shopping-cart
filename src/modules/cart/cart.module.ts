import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsEntity } from './entities/cart-items.entity';
import { ShoppingSessionsEntity } from './entities/shopping-session.entity';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TypeOrmModule.forFeature([CartItemsEntity, ShoppingSessionsEntity]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
