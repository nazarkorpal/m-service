"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Arrival_1 = __importDefault(require("./Arrival"));
const Product_1 = __importDefault(require("./Product"));
let ArrivalProduct = class ArrivalProduct extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], ArrivalProduct.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], ArrivalProduct.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Arrival_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID)
], ArrivalProduct.prototype, "document_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Product_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID)
], ArrivalProduct.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Arrival_1.default)
], ArrivalProduct.prototype, "arrival", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Product_1.default)
], ArrivalProduct.prototype, "product", void 0);
ArrivalProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "arrival_products" })
], ArrivalProduct);
exports.default = ArrivalProduct;
