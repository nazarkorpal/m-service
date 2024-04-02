import express from "express";
import cors from "cors";
import config from "config";
import Controllers from "controllers/http/controllers";
import { routes } from "./routes";
import listEndpoints from "express-list-endpoints";

const app = express();

function start(controllers: Controllers) {
  app.use(cors());
  app.use(express.json());

  app.use("/api/v1/", routes(controllers));

  listEndpoints(app).map((e) => {
    console.log(`${e.methods} ${e.path}`);
  });

  app.listen(config.port, () => {
    console.log(`Server is running at port: ${config.port}`);
  });
}

export default {
  start,
};
