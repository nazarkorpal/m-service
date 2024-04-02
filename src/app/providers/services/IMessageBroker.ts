export default interface IMessageBroker {
  send(queue: string, message: string): void;
}
