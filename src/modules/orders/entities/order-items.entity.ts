import { BaseEntity } from 'src/config/base.entity';
import { ProductEntity } from 'src/modules/products/entities/products.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrdersEntity } from './orders.entity';

@Entity({ name: 'order_items' })
export class OrderItemsEntity extends BaseEntity {
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => OrdersEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrdersEntity;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
