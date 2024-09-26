import { IsNotEmpty, IsOptional } from 'class-validator';
import { CartItemsDto } from './cart-items.dto';

export class UpdateShoppingSessionDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productsItems: CartItemsDto[];
}
