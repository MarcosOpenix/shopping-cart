import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from '../entities/orders.entity';
import { Repository } from 'typeorm';
import { OrderItemsEntity } from '../entities/order-items.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
    @InjectRepository(OrderItemsEntity)
    private readonly ordersItemsRepository: Repository<OrderItemsEntity>,
  ) {}
}
