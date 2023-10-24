import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interaface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const invoiceFacade = new InvoiceFacade({
      findUseCase: findInvoiceUseCase,
      generateUseCase: generateInvoiceUseCase,
    });

    return invoiceFacade;
  }
}