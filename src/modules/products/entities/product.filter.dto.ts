import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PRODUCT_CATEGORY } from 'src/constants/category';

export class ProductsFilterDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price: number;

  @IsEnum(PRODUCT_CATEGORY)
  @IsOptional()
  category: PRODUCT_CATEGORY;

  @IsString()
  @IsOptional()
  requestedOrder: string;

  @IsString()
  @IsOptional()
  dateOrder: string;

  @IsNumber()
  @IsOptional()
  currentPage: number;

  @IsNumber()
  @IsOptional()
  pageSize: number;
}
