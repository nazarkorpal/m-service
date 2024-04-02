import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Product from "./Product";
import Order from "./Order";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

@Table({ tableName: "order_products", timestamps: false })
class OrderProduct extends Model<
  InferAttributes<OrderProduct>,
  InferCreationAttributes<OrderProduct>
> {
  @Column(DataType.INTEGER)
  declare price: number;

  @Column(DataType.INTEGER)
  declare quantity: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, primaryKey: true, field: "document_id" })
  declare documentId: CreationOptional<string>;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, field: "product_id" })
  declare productId: CreationOptional<string>;

  @BelongsTo(() => Order)
  declare order: CreationOptional<ReturnType<() => Order>>;

  @BelongsTo(() => Product)
  declare product: CreationOptional<ReturnType<() => Product>>;
}

export default OrderProduct;
