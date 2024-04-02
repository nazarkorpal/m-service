import IArrivalRepository from "./IArrivalRepository";
import ICostRepository from "./ICostRepository";
import IOrderRepository from "./IOrderRepository";
import IProductRepository from "./IProductRepository";

export default interface IRepositories {
  productRepository: IProductRepository;
  orderRepository: IOrderRepository;
  arrivalRepository: IArrivalRepository;
  costRepository: ICostRepository;
}
