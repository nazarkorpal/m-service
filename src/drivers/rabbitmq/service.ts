import { Channel } from "amqplib";

export default class RabbitService {
  private channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
  }

  send(queue: string, message: string): boolean {
    return this.channel.sendToQueue(queue, Buffer.from(message), {
      persistent: false,
    });
  }
}
