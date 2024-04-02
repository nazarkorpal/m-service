import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({ tableName: "costs", timestamps: false })
class Cost extends Model<InferAttributes<Cost>, InferCreationAttributes<Cost>> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  declare id: string;

  @Column({ type: DataType.DATEONLY, primaryKey: true })
  declare date: Date;

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  declare value: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0, field: "arrival_price" })
  declare arrivalPrice: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0, field: "arrival_count" })
  declare arrivalCount: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0, field: "order_count" })
  declare orderCount: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare remnant: number;
}

export default Cost;
