import ArrivalsController from "controllers/http/arrivalsController";
import { Router } from "express";

export default function arrivalRoutes(controller: ArrivalsController): Router {
  const router = Router();

  router.post("", controller.createArrival);

  return router;
}
