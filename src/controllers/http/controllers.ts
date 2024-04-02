import UseCases from "app/useCases";
import ProductController from "./productsController";
import ArrivalsController from "./arrivalsController";
import OrdersController from "./ordersController";

export default class Controllers {
  private _productController: ProductController;
  private _arrivalController: ArrivalsController;
  private _orderController: OrdersController;

  constructor(useCases: UseCases) {
    this._productController = new ProductController(
      useCases.productUseCase,
      useCases.costUseCase
    );
    this._arrivalController = new ArrivalsController(useCases.arrivalUseCase);
    this._orderController = new OrdersController(useCases.orderUseCase);
  }

  get productController() {
    return this._productController;
  }

  get arrivalController() {
    return this._arrivalController;
  }

  get orderController() {
    return this._orderController;
  }
}
