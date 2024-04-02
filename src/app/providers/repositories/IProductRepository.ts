import CreateProductDto from "domain/dtos/products/createProductDto";
import Product from "domain/entities/Product";
import Report from "domain/entities/Report";

export default interface IProductRepository {
  create(productDto: CreateProductDto): Promise<Product>;
  getReportsByRange(from: Date, to: Date): Promise<Report[]>;
}
