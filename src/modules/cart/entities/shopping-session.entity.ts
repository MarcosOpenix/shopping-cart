import { BaseEntity } from 'src/config/base.entity';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CartItemsEntity } from './cart-items.entity';

@Entity({ name: 'shopping_sessions' })
export class ShoppingSessionsEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.shoppingSession)
  cartItems: CartItemsEntity[];
}
