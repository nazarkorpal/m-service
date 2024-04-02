import DomainOrder from "domain/entities/Order";
import Order from "../models/Order";
import CreateOrderDto from "domain/dtos/orders/createOrderDto";
import OrderProduct from "../models/OrderProduct";
import UpdateOrderDto from "domain/dtos/orders/updateOrderDto";
import { Op } from "sequelize";
import moment from "moment";

export default class OrderRepository {
  async create(orderDto: CreateOrderDto): Promise<DomainOrder> {
    const order = new Order();
    order.date = orderDto.date;

    const result = await OrderProduct.create(
      {
        price: orderDto.price,
        quantity: orderDto.quantity,
        productId: orderDto.productId,
        order,
      },
      { include: [Order] }
    );

    const domainOrder: DomainOrder = {
      id: result.documentId,
      price: result.price,
      quantity: result.quantity,
      date: result.order.date,
      productId: result.productId,
    };

    return domainOrder;
  }

  async update(orderDto: UpdateOrderDto): Promise<DomainOrder | null> {
    const result = await OrderProduct.findByPk(orderDto.id, {
      include: [Order],
    });

    if (!result) {
      return null;
    }

    result.price = orderDto.price;
    result.quantity = orderDto.quantity;

    await result.save();

    const domainOrder: DomainOrder = {
      id: result.documentId,
      price: result.price,
      quantity: result.quantity,
      date: result.order.date,
      productId: result.productId,
    };

    return domainOrder;
  }

  async findOneByDate(
    date: Date,
    productId: string
  ): Promise<DomainOrder | null> {
    const from = moment(date).startOf("day");
    const to = moment(date).endOf("day");
    const result = await Order.findOne({
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
      include: [
        {
          model: OrderProduct,
          where: {
            productId,
          },
        },
      ],
    });

    if (!result) return null;

    const domainOrder: DomainOrder = {
      id: result.id,
      price: result.product.price,
      quantity: result.product.quantity,
      date: result.date,
      productId: result.product.productId,
    };

    return domainOrder;
  }

  async getAllByDateRange(from: Date, to: Date): Promise<DomainOrder[]> {
    const result = await Order.findAll({
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
      include: [OrderProduct],
    });

    return result.map((e) => {
      const domainOrder: DomainOrder = {
        id: e.id,
        price: e.product.price,
        quantity: e.product.quantity,
        date: e.date,
        productId: e.product.productId,
      };

      return domainOrder;
    });
  }
}
