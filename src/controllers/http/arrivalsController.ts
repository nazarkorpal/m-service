import ArrivalUseCase from "app/useCases/arrivalUseCase";
import CreateArrivalDto from "domain/dtos/arrivals/createArrivalDto";
import { Request, Response } from "express";

export default class ArrivalsController {
  private arrivalUseCase: ArrivalUseCase;

  constructor(arrivalUseCase: ArrivalUseCase) {
    this.arrivalUseCase = arrivalUseCase;
  }

  public createArrival = async (req: Request, res: Response) => {
    try {
      const data: CreateArrivalDto = req.body;
      const arrival = await this.arrivalUseCase.createArrival(data);
      if (!arrival) {
        res.status(400).send("Something went wrong!");
      }

      res.send(arrival);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
}
