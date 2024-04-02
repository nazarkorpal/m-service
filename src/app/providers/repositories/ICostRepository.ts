import CostDto from "domain/dtos/cost/costDto";
import Cost from "domain/entities/Cost";
import DomainCost from "domain/entities/Cost";

export default interface ICostRepository {
  create(cost: CostDto): Promise<Cost>;
  update(cost: CostDto): Promise<boolean>;
  getAllFrom(date: Date, productId: string): Promise<DomainCost[]>;
  updateRange(costs: DomainCost[]): Promise<Cost[]>;
  getPreviousById(id: string, date: Date): Promise<Cost | null>;
  getCurrentById(id: string, date: Date): Promise<Cost | null>;
}
