import UseCases from "app/useCases";
import CostUpdateAllConsumer from "./costUpdateAllConsumer";
import CostUpdateConsumer from "./costUpdateConsumer";
import IConsumer from "./IConsumer";
import { Connection } from "amqplib";

export default class Consumers {
  private consumers: IConsumer[];

  constructor(connection: Connection, useCases: UseCases) {
    this.consumers = [
      new CostUpdateConsumer(connection, useCases.costUseCase),
      new CostUpdateAllConsumer(connection, useCases.costUseCase),
    ];
  }

  public init() {
    this.consumers.forEach((consumer) => {
      consumer.consume();
    });
  }
}
