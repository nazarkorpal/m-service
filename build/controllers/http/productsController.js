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
Object.defineProperty(exports, "__esModule", { value: true });
class ProductsController {
    constructor(productUseCase) {
        this.addProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const product = this._productUseCase.createProduct(data);
                res.send(product);
            }
            catch (error) {
                console.log(error);
                res.status(400).send(error);
            }
        });
        this.getProductCostByDate = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this.getProductsReportByDateRange = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this._productUseCase = productUseCase;
    }
}
exports.default = ProductsController;
