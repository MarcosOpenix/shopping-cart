import { BaseEntity } from 'src/config/base.entity';
import { ProductEntity } from 'src/modules/products/entities/products.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { ShoppingSessionsEntity } from './shopping-session.entity';

@Entity({ name: 'cart_items' })
@Unique(['product', 'shoppingSession'])
export class CartItemsEntity extends BaseEntity {
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => ShoppingSessionsEntity)
  @JoinColumn({ name: 'session_id' })
  shoppingSession: ShoppingSessionsEntity;

  @Column()
  quantity: number;
}
