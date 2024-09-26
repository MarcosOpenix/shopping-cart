import { Controller, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderItemsEntity } from '../entities/order-items.entity';

@Controller('orders')
export class OrdersController {}
