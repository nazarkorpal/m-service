import CreateArrivalDto from "domain/dtos/arrivals/createArrivalDto";
import ArrivalProduct from "./../models/ArrivalProduct";
import DomainArrival from "domain/entities/Arrival";
import Arrival from "../models/Arrival";
import UpdateArrivalDto from "domain/dtos/arrivals/updateArrivalDto";
import { Op } from "sequelize";
import moment from "moment";

export default class ArrivalRepository {
  async create(arrivalDto: CreateArrivalDto): Promise<DomainArrival> {
    const arrival = new Arrival();
    arrival.date = arrivalDto.date;

    const result = await ArrivalProduct.create(
      {
        price: arrivalDto.price,
        quantity: arrivalDto.quantity,
        productId: arrivalDto.productId,
        arrival,
      },
      { include: [Arrival] }
    );

    const domainArrival: DomainArrival = {
      id: result.documentId,
      price: result.price,
      quantity: result.quantity,
      date: result.arrival.date,
      productId: result.productId,
    };

    return domainArrival;
  }

  async update(arrivalDto: UpdateArrivalDto): Promise<DomainArrival | null> {
    const result = await ArrivalProduct.findByPk(arrivalDto.id, {
      include: [Arrival],
    });

    if (!result) {
      return null;
    }

    result.price = arrivalDto.price;
    result.quantity = arrivalDto.quantity;

    await result.save();

    const domainArrival: DomainArrival = {
      id: result.documentId,
      price: result.price,
      quantity: result.quantity,
      date: result.arrival.date,
      productId: result.productId,
    };

    return domainArrival;
  }

  async findOneByDate(
    date: Date,
    productId: string
  ): Promise<DomainArrival | null> {
    const from = moment(date).startOf("day");
    const to = moment(date).endOf("day");
    const result = await Arrival.findOne({
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
      include: [
        {
          model: ArrivalProduct,
          where: {
            productId,
          },
        },
      ],
    });

    if (!result) return null;

    const domainArrival: DomainArrival = {
      id: result.id,
      price: result.product.price,
      quantity: result.product.quantity,
      date: result.date,
      productId: result.product.productId,
    };

    return domainArrival;
  }

  async getAllByDateRange(from: Date, to: Date): Promise<DomainArrival[]> {
    const result = await Arrival.findAll({
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
      include: [ArrivalProduct],
    });

    return result.map((e) => {
      const domainArrival: DomainArrival = {
        id: e.id,
        price: e.product.price,
        quantity: e.product.quantity,
        date: e.date,
        productId: e.product.productId,
      };

      return domainArrival;
    });
  }
}
