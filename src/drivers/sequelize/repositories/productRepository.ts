import DomainProduct from "domain/entities/Product";
import Product from "../models/Product";
import CreateProductDto from "domain/dtos/products/createProductDto";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Report from "domain/entities/Report";

export default class ProductRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async create(productDto: CreateProductDto): Promise<DomainProduct> {
    return await Product.create({ name: productDto.name });
  }

  async getReportsByRange(from: Date, to: Date): Promise<Report[]> {
    const result: Report[] = await this.sequelize.query(
      "SELECT * FROM reports_view WHERE date BETWEEN :from AND :to",
      { replacements: { from, to }, type: QueryTypes.SELECT }
    );

    return result;
  }
}
