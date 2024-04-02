import IServices from "app/providers/services/IServices";
import IRepositories from "app/providers/repositories/IRepositories";
import ProductUseCase from "./productUseCase";
import ArrivalUseCase from "./arrivalUseCase";
import OrderUseCase from "./orderUseCase";
import CostUseCase from "./costUseCase";

export default class UseCases {
  private _productUseCase: ProductUseCase;
  private _arrivalUseCase: ArrivalUseCase;
  private _orderUseCase: OrderUseCase;
  private _costUseCase: CostUseCase;

  constructor(services: IServices, repositories: IRepositories) {
    this._productUseCase = new ProductUseCase(repositories.productRepository);
    this._arrivalUseCase = new ArrivalUseCase(
      services.messageBroker,
      repositories.arrivalRepository
    );
    this._orderUseCase = new OrderUseCase(
      services.messageBroker,
      repositories.orderRepository
    );
    this._costUseCase = new CostUseCase(
      repositories.costRepository,
      repositories.arrivalRepository,
      repositories.orderRepository,
      services.messageBroker
    );
  }

  get productUseCase(): ProductUseCase {
    return this._productUseCase;
  }

  get arrivalUseCase(): ArrivalUseCase {
    return this._arrivalUseCase;
  }

  get orderUseCase(): OrderUseCase {
    return this._orderUseCase;
  }

  get costUseCase(): CostUseCase {
    return this._costUseCase;
  }
}
