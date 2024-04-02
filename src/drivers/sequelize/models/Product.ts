import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import ArrivalProduct from "./ArrivalProduct";
import OrderProduct from "./OrderProduct";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

@Table({ tableName: "products", timestamps: false })
class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: CreationOptional<string>;

  @Column({ type: DataType.STRING, unique: true })
  declare name: string;

  @HasMany(() => ArrivalProduct)
  declare arrivals: CreationOptional<ReturnType<() => ArrivalProduct[]>>;

  @HasMany(() => OrderProduct)
  declare orders: CreationOptional<ReturnType<() => OrderProduct[]>>;
}

export default Product;
