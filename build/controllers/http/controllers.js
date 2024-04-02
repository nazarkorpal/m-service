"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsController_1 = __importDefault(require("./productsController"));
class Controllers {
    constructor(useCases) {
        this._productController = new productsController_1.default(useCases.productUseCase);
    }
    get productController() {
        return this._productController;
    }
}
exports.default = Controllers;
