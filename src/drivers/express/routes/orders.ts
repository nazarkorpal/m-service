import OrdersController from "controllers/http/ordersController";
import { Router } from "express";

export default function orderRoutes(controller: OrdersController): Router {
  const router = Router();

  router.post("", controller.createOrder);

  return router;
}
