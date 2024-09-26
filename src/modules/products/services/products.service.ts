import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsDto, UpdateProductsDto } from '../dto/products.dto';
import { ProductEntity } from '../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductsFilterDto } from '../entities/product.filter.dto';
import { OrderItemsEntity } from 'src/modules/orders/entities/order-items.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async createProduct(product: ProductsDto) {
    const newProduct = {
      ...product,
      activated: true,
    };
    const result = await this.productRepository.save(newProduct);
    return { proudctId: result.id };
  }

  public async findOneById(id: string) {
    const result = await this.productRepository.findOneBy({ id });
    if (!result) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  public async findProducts(body: ProductsFilterDto) {
    const {
      name,
      price,
      category,
      requestedOrder,
      dateOrder,
      currentPage = 1,
      pageSize,
    } = body;
    const query = this.productRepository
      .createQueryBuilder('product')
      .addSelect(
        'COALESCE(CAST(SUM(orderItem.quantity) AS INTEGER),0)',
        'quantityInOrders',
      )
      .addSelect(
        'COALESCE(CAST(SUM(cartItem.quantity) AS INTEGER),0)',
        'quantityInCarts',
      )
      .addSelect(
        '(COALESCE(CAST(SUM(orderItem.quantity) AS INTEGER), 0) + COALESCE(CAST(SUM(cartItem.quantity) AS INTEGER), 0))',
        'totalRequested',
      )
      .leftJoin('product.orderItems', 'orderItem')
      .leftJoin('product.cartItems', 'cartItem')
      .where('product.activated = :activated', { activated: true })
      .groupBy('product.id');
    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }
    if (price) {
      query.andWhere('product.price = :price', { price: price });
    }
    if (category) {
      query.andWhere('product.category = :category', { category: category });
    }
    if (requestedOrder) {
      query.orderBy(
        '"totalRequested"',
        requestedOrder.toUpperCase() as 'ASC' | 'DESC',
      );
    }
    if (dateOrder) {
      query.orderBy(
        'product.createdAt',
        dateOrder.toUpperCase() as 'ASC' | 'DESC',
      );
    }
    const numberRegister = await query.getCount();
    const pageSizeAux = pageSize ?? numberRegister;
    query.limit(pageSizeAux);
    const offset = (currentPage - 1) * pageSizeAux;
    query.offset(offset);
    const products = await query.getRawMany();

    return {
      currentPage,
      pageSize,
      data: products.map((product) => ({
        name: product.product_name,
        price: product.product_price,
        stock: product.product_stock,
        category: product.product_category,
        activated: product.product_activated,
        quantityInOrders: product.quantityInOrders,
        quantityInCart: product.quantityInCarts,
      })),
    };
  }

  public async findOneAndUpdate(id: string, body: UpdateProductsDto) {
    const exist = await this.productRepository.findOneBy({ id });
    if (!exist || !exist.activated) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.productRepository.update({ id }, body);
  }

  public async findOneAndUpdateStock(id: string, stock: number) {
    const exist = await this.productRepository.findOneBy({ id });
    if (!exist || !exist.activated) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.productRepository.update({ id }, { stock: stock });
  }

  public async findProductAndDelete(id: string) {
    const exist = await this.productRepository.findOneBy({ id });
    if (!exist || !exist.activated) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return await this.productRepository.update(
      { id },
      {
        activated: false,
        stock: 0,
      },
    );
  }

  public async findProductsByIds(productsIds: string[]) {
    const result = await this.productRepository.findBy({ id: In(productsIds) });
    return result;
  }
}
