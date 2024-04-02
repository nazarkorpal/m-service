"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    database: config_1.default.postgres.database,
    username: config_1.default.postgres.user,
    password: config_1.default.postgres.password,
    host: config_1.default.postgres.host,
    port: config_1.default.postgres.port,
    models: [__dirname + "/models"],
    logging: false,
});
exports.default = sequelize;
