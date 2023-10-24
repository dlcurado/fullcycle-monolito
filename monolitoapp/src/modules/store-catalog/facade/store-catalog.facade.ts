import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, FindAllStoreCatalogFacadeOutputDto } from "./store-catalog.facade.dto";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  findAllUseCase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _findAllUseCase: UseCaseInterface;
  
  constructor(usecaseProps: UseCaseProps) {
    this._findUseCase = usecaseProps.findUseCase;
    this._findAllUseCase = usecaseProps.findAllUseCase;
  }

  async find(product: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(product);
  }
  
  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute({});
  }
}