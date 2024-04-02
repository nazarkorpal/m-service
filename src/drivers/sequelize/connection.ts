import config from "config";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: config.postgres.database,
  username: config.postgres.user,
  password: config.postgres.password,
  host: config.postgres.host,
  port: config.postgres.port,
  models: [__dirname + "/models"],
});

export default sequelize;
