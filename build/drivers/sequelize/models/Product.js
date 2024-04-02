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
const ArrivalProduct_1 = __importDefault(require("./ArrivalProduct"));
const OrderProduct_1 = __importDefault(require("./OrderProduct"));
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.CHAR)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ArrivalProduct_1.default)
], Product.prototype, "arrivals", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => OrderProduct_1.default)
], Product.prototype, "orders", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "products" })
], Product);
exports.default = Product;
