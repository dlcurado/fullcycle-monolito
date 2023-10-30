import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddOrderFacadeInputDto } from "./checkout.facade.dto";
import CheckoutFacadeInterface from "./checkout.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _addUseCase: UseCaseInterface;
  
  constructor(usecaseProps: UseCaseProps) {
    this._addUseCase = usecaseProps.addUseCase;
  }

  async add(order: AddOrderFacadeInputDto): Promise<void> {
    return await this._addUseCase.execute(order);
  }
}