import IOrderRepository from "app/providers/repositories/IOrderRepository";
import IMessageBroker from "app/providers/services/IMessageBroker";
import UpdateCostMessageDto from "domain/dtos/messages/updateCostMessage";
import CreateOrderDto from "domain/dtos/orders/createOrderDto";
import UpdateOrderDto from "domain/dtos/orders/updateOrderDto";
import Order from "domain/entities/Order";
import { Queues } from "domain/enums/queues";

export default class OrderUseCase {
  private orderRepository: IOrderRepository;
  private mqService: IMessageBroker;

  constructor(mqService: IMessageBroker, orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
    this.mqService = mqService;
  }

  public async createOrder(orderDto: CreateOrderDto): Promise<Order | null> {
    let newArrival: Order | null;
    const order = await this.orderRepository.findOneByDate(
      orderDto.date,
      orderDto.productId
    );

    if (order) {
      const updateOrderDto: UpdateOrderDto = {
        id: order.id,
        price: order.price,
        quantity: order.quantity,
      };

      newArrival = await this.orderRepository.update(updateOrderDto);
    } else {
      newArrival = await this.orderRepository.create(orderDto);
    }

    if (!newArrival) {
      return null;
    }

    const messageData: UpdateCostMessageDto = {
      productId: newArrival.productId,
      date: newArrival.date,
    };

    this.mqService.send(Queues.UpdateCost, JSON.stringify(messageData));
    return newArrival;
  }
}
