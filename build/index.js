"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
require("tsconfig-paths/register");
const productRepository_1 = __importDefault(require("./drivers/sequelize/repositories/productRepository"));
const useCases_1 = __importDefault(require("./app/useCases/useCases"));
const arrivalRepository_1 = __importDefault(require("./drivers/sequelize/repositories/arrivalRepository"));
const orderRepository_1 = __importDefault(require("./drivers/sequelize/repositories/orderRepository"));
const controllers_1 = __importDefault(require("./controllers/http/controllers"));
const connection_1 = __importDefault(require("./drivers/sequelize/connection"));
const server_1 = __importDefault(require("./drivers/express/server"));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            connection_1.default.sync({ force: true, logging: false });
            yield connection_1.default.authenticate();
            console.log("Connection to the database has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
        const repositories = {
            productRepository: new productRepository_1.default(),
            arrivalRepository: new arrivalRepository_1.default(),
            orderRepository: new orderRepository_1.default(),
        };
        const useCases = new useCases_1.default(repositories);
        const controllers = new controllers_1.default(useCases);
        server_1.default.start(controllers);
    });
}
start();
