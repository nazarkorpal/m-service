import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import OrderProduct from "./OrderProduct";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from "sequelize";

@Table({ tableName: "orders", timestamps: false })
class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: CreationOptional<string>;

  @Column(DataType.DATE)
  declare date: Date;

  @HasOne(() => OrderProduct)
  declare product: CreationOptional<ReturnType<() => OrderProduct>>;
}

export default Order;
