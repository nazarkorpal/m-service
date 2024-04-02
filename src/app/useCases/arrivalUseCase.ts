import IArrivalRepository from "app/providers/repositories/IArrivalRepository";
import IMessageBroker from "app/providers/services/IMessageBroker";
import CreateArrivalDto from "domain/dtos/arrivals/createArrivalDto";
import UpdateArrivalDto from "domain/dtos/arrivals/updateArrivalDto";
import UpdateCostMessageDto from "domain/dtos/messages/updateCostMessage";
import Arrival from "domain/entities/Arrival";
import { Queues } from "domain/enums/queues";
import moment from "moment";

export default class ArrivalUseCase {
  private arrivalRepository: IArrivalRepository;
  private mqService: IMessageBroker;

  constructor(
    mqService: IMessageBroker,
    arrivalRepository: IArrivalRepository
  ) {
    this.arrivalRepository = arrivalRepository;
    this.mqService = mqService;
  }

  public async createArrival(
    arrivalDto: CreateArrivalDto
  ): Promise<Arrival | null> {
    let newArrival: Arrival | null;
    const arrival = await this.arrivalRepository.findOneByDate(
      arrivalDto.date,
      arrivalDto.productId
    );

    if (arrival) {
      const updateArrivalDto: UpdateArrivalDto = {
        id: arrival.id,
        price: arrivalDto.price,
        quantity: arrivalDto.quantity,
      };

      newArrival = await this.arrivalRepository.update(updateArrivalDto);
    } else {
      newArrival = await this.arrivalRepository.create(arrivalDto);
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
