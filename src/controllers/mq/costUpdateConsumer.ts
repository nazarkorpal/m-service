import CostUseCase from "app/useCases/costUseCase";
import IConsumer from "./IConsumer";
import { Connection } from "amqplib";
import { Queues } from "domain/enums/queues";
import UpdateCostMessageDto from "domain/dtos/messages/updateCostMessage";

export default class CostUpdateConsumer implements IConsumer {
  private connection: Connection;
  private costUseCase: CostUseCase;

  constructor(connection: Connection, costUseCase: CostUseCase) {
    this.costUseCase = costUseCase;
    this.connection = connection;
  }

  public async consume() {
    try {
      const channel = await this.connection.createChannel();
      await channel.assertQueue(Queues.UpdateCost, { durable: false });
      channel.consume(
        Queues.UpdateCost,
        async (message) => {
          if (message !== null) {
            const data: UpdateCostMessageDto = JSON.parse(
              message.content.toString()
            );
            await this.costUseCase.createOrUpdateCost(data);
          } else {
            console.log("Consumer cancelled by server");
          }
        },
        { noAck: true }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
