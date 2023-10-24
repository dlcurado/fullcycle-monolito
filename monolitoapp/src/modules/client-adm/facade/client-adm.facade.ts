import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";
import { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.dto";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;
  
  constructor(usecaseProps: UseCaseProps) {
    this._addUseCase = usecaseProps.addUseCase;
    this._findUseCase = usecaseProps.findUseCase;
  }

  async add(client: AddClientFacadeInputDto): Promise<void> {
    return await this._addUseCase.execute(client);
  }
  async find(client: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase.execute(client);
  }
}