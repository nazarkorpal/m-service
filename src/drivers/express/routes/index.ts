import Controllers from "controllers/http/controllers";
import { Router } from "express";
import productRoutes from "./products";
import arrivalRoutes from "./arrivals";
import orderRoutes from "./orders";

export function routes(controllers: Controllers): Router {
  const router = Router();

  router.use("/products", productRoutes(controllers.productController));
  router.use("/arrivals", arrivalRoutes(controllers.arrivalController));
  router.use("/orders", orderRoutes(controllers.orderController));

  router.get("/cost/:id", controllers.productController.getProductCostByDate);
  router.get(
    "/report",
    controllers.productController.getProductsReportByDateRange
  );

  return router;
}
