import { IsNotEmpty, Min } from 'class-validator';

export class CartItemsDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemsDto {
  @IsNotEmpty()
  shoppingCartId: string;

  @IsNotEmpty()
  productIds: string[];
}
