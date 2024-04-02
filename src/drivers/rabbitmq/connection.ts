import amqplib from "amqplib";
import config from "config";

export default async () => {
  const conn = await amqplib.connect({
    hostname: config.rabbitMQ.hostname,
    port: config.rabbitMQ.port,
    username: config.rabbitMQ.username,
    password: config.rabbitMQ.password,
    vhost: "/",
  });

  return conn;
};
