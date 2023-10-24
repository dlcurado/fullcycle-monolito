import PaymentFacade from "../facade/payment.facade";
import { PaymentFacadeInterface } from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const repository = new TransactionRepository();
    const processUseCase = new ProcessPaymentUseCase(repository);
    const paymentFacade = new PaymentFacade(processUseCase);

    return paymentFacade;
  }
}