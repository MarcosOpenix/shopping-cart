import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductsDto, UpdateProductsDto } from '../dto/products.dto';
import { ProductsFilterDto } from '../entities/product.filter.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('create')
  public async createProduct(@Body() body: ProductsDto) {
    return this.productService.createProduct(body);
  }

  @Get('search')
  public async getFilteredProducts(@Body() body: ProductsFilterDto) {
    return this.productService.findProducts(body);
  }

  @Get(':id')
  public async findProductByID(@Param('id') productId: string) {
    return this.productService.findOneById(productId);
  }

  @Patch('/edit/:id')
  public async findProductAndUpdate(
    @Param('id') productId: string,
    @Body() body: UpdateProductsDto,
  ) {
    return this.productService.findOneAndUpdate(productId, body);
  }

  @Patch('/edit/:id/:stock')
  public async findProductAndUpdateStock(
    @Param('id') productId: string,
    @Param('stock') stock: number,
  ) {
    return this.productService.findOneAndUpdateStock(productId, stock);
  }

  @Patch('/delete/:id')
  public async findProductAndDisable(@Param('id') productId) {
    return this.productService.findProductAndDelete(productId);
  }
}
