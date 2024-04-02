import IProductRepository from "app/providers/repositories/IProductRepository";
import CreateProductDto from "domain/dtos/products/createProductDto";
import Product from "domain/entities/Product";
import Report from "domain/entities/Report";

export default class ProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async createProduct(productDto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(productDto);
  }

  public async getReports(from: Date, to: Date): Promise<Report[]> {
    return await this.productRepository.getReportsByRange(from, to);
  }
}
