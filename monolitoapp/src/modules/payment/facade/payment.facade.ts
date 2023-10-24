import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { PaymentFacadeInterface } from "./payment.facade.interface";
import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface.dto";


export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }

}