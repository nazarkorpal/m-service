import moment from "moment";
import Cost from "../models/Cost";
import DomainCost from "domain/entities/Cost";
import { Op } from "sequelize";
import CostDto from "domain/dtos/cost/costDto";

export default class CostRepository {
  async create(cost: CostDto): Promise<DomainCost> {
    return await Cost.create({
      ...cost,
    });
  }

  async update(cost: CostDto): Promise<boolean> {
    const { id, date, ...costData } = cost;
    const result = await Cost.update({ ...costData }, { where: { id, date } });

    return result.length > 0;
  }

  async getCurrentById(id: string, date: Date): Promise<DomainCost | null> {
    const firstDayOfMonth = moment(date).startOf("month");
    return await Cost.findOne({
      where: {
        id,
        date: {
          [Op.between]: [
            firstDayOfMonth.startOf("day").toDate(),
            firstDayOfMonth.endOf("day").toDate(),
          ],
        },
      },
    });
  }

  async getPreviousById(id: string, date: Date): Promise<DomainCost | null> {
    const firstDayOfMonth = moment(date).startOf("month");
    return await Cost.findOne({
      where: {
        id,
        date: {
          [Op.lt]: firstDayOfMonth.startOf("day").toDate(),
        },
      },
      order: ["date"],
    });
  }

  async getAllFrom(date: Date, productId: string): Promise<DomainCost[]> {
    const result = await Cost.findAll({
      where: {
        id: productId,
        date: {
          [Op.gte]: date,
        },
      },
      order: ["date"],
    });

    return result;
  }

  async updateRange(costs: DomainCost[]): Promise<DomainCost[]> {
    const updatePromises = costs.map((cost) => {
      return Cost.update(cost, {
        where: {
          id: cost.id,
          date: {
            [Op.between]: [
              moment(cost.date).startOf("month"),
              moment(cost.date).endOf("month"),
            ],
          },
        },
      });
    });
    await Promise.all(updatePromises);
    return costs;
  }
}
