import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Arrival from "./Arrival";
import Product from "./Product";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

@Table({ tableName: "arrival_products", timestamps: false })
class ArrivalProduct extends Model<
  InferAttributes<ArrivalProduct>,
  InferCreationAttributes<ArrivalProduct>
> {
  @Column(DataType.INTEGER)
  declare price: number;

  @Column(DataType.INTEGER)
  declare quantity: number;

  @ForeignKey(() => Arrival)
  @Column({ type: DataType.UUID, primaryKey: true, field: "document_id" })
  declare documentId: CreationOptional<string>;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, field: "product_id" })
  declare productId: CreationOptional<string>;

  @BelongsTo(() => Arrival)
  declare arrival: CreationOptional<ReturnType<() => Arrival>>;

  @BelongsTo(() => Product)
  declare product: CreationOptional<ReturnType<() => Product>>;
}

export default ArrivalProduct;
