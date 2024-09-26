import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { PRODUCT_CATEGORY } from 'src/constants/category';

export class ProductsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'No se permite stock negativo' })
  stock: number;

  @IsNotEmpty()
  @IsEnum(PRODUCT_CATEGORY)
  category: PRODUCT_CATEGORY;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateProductsDto extends OmitType(ProductsDto, [
  'stock',
] as const) {}
