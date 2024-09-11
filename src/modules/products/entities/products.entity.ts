import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PRODUCT_CATEGORY } from 'src/constants/category';
import { OrderItemsEntity } from 'src/modules/orders/entities/order-items.entity';
import { CartItemsEntity } from 'src/modules/cart/entities/cart-items.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY })
  category: PRODUCT_CATEGORY;

  @Column()
  description: string;

  @Column()
  activated: boolean;

  @OneToMany(() => CartItemsEntity, (carts) => carts.product)
  cartItems: CartItemsEntity[];

  @OneToMany(() => OrderItemsEntity, (orders) => orders.product)
  orderItems: OrderItemsEntity[];
}
