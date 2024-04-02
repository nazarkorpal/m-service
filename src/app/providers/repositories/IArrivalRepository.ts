import CreateArrivalDto from "domain/dtos/arrivals/createArrivalDto";
import UpdateArrivalDto from "domain/dtos/arrivals/updateArrivalDto";
import Arrival from "domain/entities/Arrival";

export default interface IArrivalRepository {
  create(arrivalDto: CreateArrivalDto): Promise<Arrival>;
  update(arrivalDto: UpdateArrivalDto): Promise<Arrival | null>;
  findOneByDate(date: Date, productId: string): Promise<Arrival | null>;
  getAllByDateRange(from: Date, to: Date): Promise<Arrival[]>;
}
