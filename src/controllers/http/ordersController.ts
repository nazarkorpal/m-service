import OrderUseCase from "app/useCases/orderUseCase";
import CreateOrderDto from "domain/dtos/orders/createOrderDto";
import { Request, Response } from "express";

export default class OrdersController {
  private orderUseCase: OrderUseCase;

  constructor(orderUseCase: OrderUseCase) {
    this.orderUseCase = orderUseCase;
  }

  public createOrder = async (req: Request, res: Response) => {
    try {
      const data: CreateOrderDto = req.body;
      const order = await this.orderUseCase.createOrder(data);
      if (!order) {
        res.status(400).send("Something went wrong!");
      }

      res.send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
}
