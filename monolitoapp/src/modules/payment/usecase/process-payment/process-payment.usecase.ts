
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction.entity";
import PaymentGateway from "../../gateway/payment.gateway"
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  //private _repository: PaymentGateway;
  constructor(private repository: PaymentGateway) {
    //this._repository = repository;
  }

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();

    const persistTransaction = await this.repository.save(transaction);

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: persistTransaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    }
  }
}