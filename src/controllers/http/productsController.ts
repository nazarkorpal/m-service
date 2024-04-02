import CostUseCase from "app/useCases/costUseCase";
import ProductUseCase from "app/useCases/productUseCase";
import CreateProductDto from "domain/dtos/products/createProductDto";
import { Request, Response } from "express";

export default class ProductsController {
  private productUseCase: ProductUseCase;
  private costUseCase: CostUseCase;

  constructor(productUseCase: ProductUseCase, costUseCase: CostUseCase) {
    this.productUseCase = productUseCase;
    this.costUseCase = costUseCase;
  }

  public createProduct = async (req: Request, res: Response) => {
    try {
      const data: CreateProductDto = req.body;
      const product = await this.productUseCase.createProduct(data);
      res.send(product);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  public getProductCostByDate = async (
    req: Request<{ id: string }, any, any, { date: Date }>,
    res: Response
  ) => {
    try {
      const id = req.params.id;
      const date = req.query.date ?? new Date();
      const product = await this.costUseCase.getActualCost(id, date);
      res.send({
        id: product?.id,
        date: product?.date,
        value: product?.value,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };

  public getProductsReportByDateRange = async (
    req: Request<any, any, any, { from: Date; to: Date }>,
    res: Response
  ) => {
    try {
      const { from, to } = req.query;
      const reports = await this.productUseCase.getReports(from, to);
      res.send(reports);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
}
