import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product.facade.dto"

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;
  
  constructor(usecaseProps: UseCaseProps) {
    this._addUseCase = usecaseProps.addUseCase;
    this._checkStockUseCase = usecaseProps.checkStockUseCase;
  }

  addProduct(product: AddProductFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(product);
  }

  checkStock(product: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(product.productId);
  }
  
}