"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productUseCase_1 = __importDefault(require("./productUseCase"));
class UseCases {
    constructor(repositories) {
        this._productUseCase = new productUseCase_1.default(repositories.productRepository);
    }
    get productUseCase() {
        return this._productUseCase;
    }
}
exports.default = UseCases;
