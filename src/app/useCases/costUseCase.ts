import IArrivalRepository from "app/providers/repositories/IArrivalRepository";
import ICostRepository from "app/providers/repositories/ICostRepository";
import IOrderRepository from "app/providers/repositories/IOrderRepository";
import IMessageBroker from "app/providers/services/IMessageBroker";
import CostDto from "domain/dtos/cost/costDto";
import UpdateCostMessageDto from "domain/dtos/messages/updateCostMessage";
import Cost from "domain/entities/Cost";
import { Queues } from "domain/enums/queues";
import moment from "moment";

export default class CostUseCase {
  private costRepository: ICostRepository;
  private arrivalRepository: IArrivalRepository;
  private orderRepository: IOrderRepository;
  private messageService: IMessageBroker;

  constructor(
    costRepository: ICostRepository,
    arrivalRepository: IArrivalRepository,
    orderRepository: IOrderRepository,
    messageService: IMessageBroker
  ) {
    this.costRepository = costRepository;
    this.arrivalRepository = arrivalRepository;
    this.orderRepository = orderRepository;
    this.messageService = messageService;
  }

  public async createOrUpdateCost(data: UpdateCostMessageDto) {
    const date = moment(data.date);
    const firstDateOfMonth = date.startOf("month").toDate();
    const lastDateOfMonth = date.endOf("month").toDate();

    const prevCost = await this.costRepository.getPreviousById(
      data.productId,
      data.date
    );
    const currentCost = await this.costRepository.getCurrentById(
      data.productId,
      data.date
    );

    const arrivals = await this.arrivalRepository.getAllByDateRange(
      firstDateOfMonth,
      lastDateOfMonth
    );
    const orders = await this.orderRepository.getAllByDateRange(
      firstDateOfMonth,
      lastDateOfMonth
    );

    const orderCount = orders.reduce((sum, e) => {
      return sum + e.quantity;
    }, 0);

    const prevRemnantPrice = prevCost ? prevCost.remnant * prevCost.value : 0;
    const arrivalCount = arrivals.reduce((sum, arrival) => {
      return sum + arrival.quantity;
    }, 0);

    const currentRemnant = this.calculateRemnant(
      arrivalCount,
      prevCost?.remnant ?? 0,
      orderCount
    );
    const arrivalPrice = arrivals.reduce((sum, arrival) => {
      return sum + arrival.quantity * arrival.price;
    }, 0);

    const costValue = this.calculateCost(
      prevRemnantPrice,
      arrivalPrice,
      currentRemnant
    );

    const costToUpdate: CostDto = {
      id: data.productId,
      value: costValue,
      date: firstDateOfMonth,
      arrivalCount: arrivalCount,
      arrivalPrice: arrivalPrice,
      orderCount: orderCount,
      remnant: currentRemnant,
    };
    if (!currentCost) {
      await this.costRepository.create(costToUpdate);
    } else {
      await this.costRepository.update(costToUpdate);
    }

    await this.messageService.send(Queues.UpdateAllCosts, JSON.stringify(data));
  }

  public async updateAllCosts(data: UpdateCostMessageDto) {
    const from = moment(data.date).startOf("month").toDate();
    const costs = await this.costRepository.getAllFrom(from, data.productId);

    let prevElem: Cost;
    const updatedCosts = costs.map((elem, index) => {
      if (index === 0) {
        prevElem = elem;
        return elem;
      }

      const updatedElem = {
        id: elem.id,
        date: elem.date,
        arrivalCount: elem.arrivalCount,
        arrivalPrice: elem.arrivalPrice,
        orderCount: elem.orderCount,
        value: this.calculateCost(
          prevElem.value * prevElem.remnant,
          elem.arrivalPrice,
          elem.arrivalCount + prevElem.remnant
        ),
        remnant: this.calculateRemnant(
          elem.arrivalCount,
          prevElem.remnant,
          elem.orderCount
        ),
      };

      prevElem = updatedElem;

      return updatedElem;
    });

    await this.costRepository.updateRange(updatedCosts);
  }

  public async getActualCost(id: string, date: Date) {
    return await this.costRepository.getCurrentById(id, date);
  }

  private calculateCost(
    prevRemnantPrice: number,
    arrivalPrice: number,
    totalCount: number
  ): number {
    return Number(((prevRemnantPrice + arrivalPrice) / totalCount).toFixed(2));
  }

  private calculateRemnant(
    arrivalCount: number,
    prevRemnant: number,
    orderCount: number
  ) {
    return arrivalCount + prevRemnant - orderCount;
  }
}
