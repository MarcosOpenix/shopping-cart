import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { UpdateShoppingSessionDto } from '../dto/shooping-sessions.dto';
import { UpdateCartItemsDto } from '../dto/cart-items.dto';
import { LevelAuthority } from 'src/decorators/level-authority.decorator';
import { LEVEL_AUTHORITY } from 'src/constants/levelAuthority';
import { LevelAuthorityGuard } from 'src/modules/auth/guards/level-authority.guard';

@Controller('cart')
@UseGuards(LevelAuthorityGuard)
@LevelAuthority(LEVEL_AUTHORITY.CLIENT)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('update')
  public async updateUserCart(@Body() body: UpdateShoppingSessionDto) {
    return this.cartService.findShoppingSessionAndUpdate(body);
  }

  @Delete('products/delete')
  public async deleteCartProducts(@Body() body: UpdateCartItemsDto) {
    return this.cartService.deleteProductCartItem(body);
  }
}
