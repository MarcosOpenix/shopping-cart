import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CartItemsEntity } from '../entities/cart-items.entity';
import { ShoppingSessionsEntity } from '../entities/shopping-session.entity';
import { UpdateShoppingSessionDto } from '../dto/shooping-sessions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/modules/users/services/users.service';
import { ProductsService } from 'src/modules/products/services/products.service';
import { UpdateCartItemsDto } from '../dto/cart-items.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItemsEntity)
    private readonly cartRepository: Repository<CartItemsEntity>,
    @InjectRepository(ShoppingSessionsEntity)
    private readonly shoppingSessionRepository: Repository<ShoppingSessionsEntity>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  public async findShoppingSessionAndUpdate(body: UpdateShoppingSessionDto) {
    const { productsItems, userId } = body;
    const userExist = await this.userService.findOneById(userId);
    const productsIds = productsItems.map((product) => product.productId);
    //verifico que el usuario existe
    if (!userExist)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    //
    //verifico si el usuario tiene carrito
    let shoppingSessionExist = await this.shoppingSessionRepository.findOneBy({
      user: { id: userExist.id },
    });
    //
    //si no tiene carrito creo uno
    if (!shoppingSessionExist) {
      shoppingSessionExist = await this.shoppingSessionRepository.save({
        user: userExist,
      });
    }
    //
    //verifico que los productos existan
    const productsExist =
      await this.productService.findProductsByIds(productsIds);
    if (productsExist.length != productsItems.length) {
      throw new HttpException(
        'Uno o varios ids no corresponden a productos',
        HttpStatus.BAD_REQUEST,
      );
    }
    //
    const cartEntities = productsExist.map((product) => ({
      product: product,
      shoppingSession: shoppingSessionExist,
      quantity: productsItems.find(
        (productItem) => productItem.productId === product.id,
      ).quantity,
    }));
    const values = cartEntities
      .map(
        (value) =>
          `(${value.quantity}, '${value.product.id}', '${value.shoppingSession.id}')`,
      )
      .join(', ');

    await this.cartRepository.query(`
        INSERT INTO "cart_items" ("quantity", "product_id", "session_id")
        VALUES ${values}
        ON CONFLICT ("product_id", "session_id")
        DO UPDATE SET "quantity" = "cart_items".quantity + EXCLUDED."quantity", "modified_at" = DEFAULT
      `);
    return shoppingSessionExist.id;
  }

  public async deleteProductCartItem(body: UpdateCartItemsDto) {
    const { shoppingCartId, productIds } = body;

    const shoppingSessionExist = await this.shoppingSessionRepository.findOneBy(
      { id: shoppingCartId },
    );

    if (!shoppingSessionExist)
      throw new HttpException('Carrito no encontrado', HttpStatus.NOT_FOUND);

    const productsExist = await this.cartRepository.findBy({
      product: In(productIds),
      shoppingSession: { id: shoppingSessionExist.id },
    });

    console.log(productIds);
    console.log(productsExist);

    if (productIds.length != productsExist.length)
      throw new HttpException(
        'Uno o varios productos no fueron encontrados',
        HttpStatus.NOT_FOUND,
      );

    await this.cartRepository.delete({
      product: In(productIds),
      shoppingSession: shoppingSessionExist,
    });
    return shoppingSessionExist.id;
  }
}
