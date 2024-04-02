import CreateOrderDto from "domain/dtos/orders/createOrderDto";
import UpdateOrderDto from "domain/dtos/orders/updateOrderDto";
import Order from "domain/entities/Order";

export default interface IOrderRepository {
  create(orderDto: CreateOrderDto): Promise<Order>;
  update(arrivalDto: UpdateOrderDto): Promise<Order | null>;
  findOneByDate(date: Date, productId: string): Promise<Order | null>;
  getAllByDateRange(from: Date, to: Date): Promise<Order[]>;
}
