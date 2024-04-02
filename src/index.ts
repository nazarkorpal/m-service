import "dotenv/config";
import "reflect-metadata";
import "tsconfig-paths/register";
import ProductRepository from "drivers/sequelize/repositories/productRepository";
import UseCases from "app/useCases";
import IRepositories from "app/providers/repositories/IRepositories";
import ArrivalRepository from "drivers/sequelize/repositories/arrivalRepository";
import OrderRepository from "drivers/sequelize/repositories/orderRepository";
import Controllers from "controllers/http/controllers";
import sequelize from "drivers/sequelize/connection";
import server from "drivers/express/server";
import CostRepository from "drivers/sequelize/repositories/costRepository";
import RabbitMQ from "drivers/rabbitmq/connection";
import IServices from "app/providers/services/IServices";
import RabbitService from "drivers/rabbitmq/service";
import Consumers from "controllers/mq/consumers";

async function start() {
  try {
    await sequelize.sync({ logging: false });
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const rabbitConnection = await RabbitMQ();

  const sendChannel = await rabbitConnection.createChannel();

  const repositories: IRepositories = {
    productRepository: new ProductRepository(sequelize),
    arrivalRepository: new ArrivalRepository(),
    orderRepository: new OrderRepository(),
    costRepository: new CostRepository(),
  };

  const services: IServices = {
    messageBroker: new RabbitService(sendChannel),
  };

  const useCases = new UseCases(services, repositories);
  const controllers = new Controllers(useCases);
  const consumers = new Consumers(rabbitConnection, useCases);

  consumers.init();

  server.start(controllers);
}

start();
