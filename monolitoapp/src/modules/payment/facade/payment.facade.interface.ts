import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface.dto";

export interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}
