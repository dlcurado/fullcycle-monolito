import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceRepository from "../../repository/invoice.repository";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private repository: InvoiceRepository) {}
  
  async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
    const invoice = await this.repository.find(input.id);
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(
        (item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })
      ),
      total: invoice.total,
      createdAt: invoice.createdAt,
    };
  }
}