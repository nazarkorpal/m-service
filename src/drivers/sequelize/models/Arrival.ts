import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import ArrivalProduct from "./ArrivalProduct";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

@Table({ tableName: "arrivals", timestamps: false })
class Arrival extends Model<
  InferAttributes<Arrival>,
  InferCreationAttributes<Arrival>
> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: CreationOptional<string>;

  @Column(DataType.DATE)
  declare date: Date;

  @HasOne(() => ArrivalProduct)
  declare product: CreationOptional<Awaited<ArrivalProduct>>;
}

export default Arrival;
