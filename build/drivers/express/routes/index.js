"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const products_1 = __importDefault(require("./products"));
function routes(controllers) {
    const router = (0, express_1.Router)();
    router.use("/products", (0, products_1.default)(controllers.productController));
    return router;
}
exports.routes = routes;
