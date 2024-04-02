import { Router } from "express";
import ProductsController from "controllers/http/productsController";

export default function productRoutes(controller: ProductsController): Router {
  const router = Router();

  router.post("", controller.createProduct);

  return router;
}
