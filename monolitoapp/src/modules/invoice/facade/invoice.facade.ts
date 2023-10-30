import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceRepository from "../repository/invoice.repository";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interaface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface,
  generateUseCase: UseCaseInterface
}
export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;
  
  constructor(props: UseCaseProps){
    this._findUseCase = props.findUseCase;
    this._generateUseCase = props.generateUseCase;
  }

  async find(id: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUseCase.execute(id);
  }
  
  async create(invoice: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateUseCase.execute(invoice);
  }

}