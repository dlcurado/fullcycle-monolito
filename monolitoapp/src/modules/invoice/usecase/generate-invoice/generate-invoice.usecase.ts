import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Item from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceRepository from "../../repository/invoice.repository";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private repository: InvoiceRepository) {}
  
  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(),
      name: input.name,
      document: input.document,
      address: {
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      },
      items: [
        new Item({
          id: new Id("1"),
          name: "Item 1",
          price: 50.0,
        })
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const invoice = new Invoice(props);
    await this.repository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(
        (item) => ({
            id: item.id.id,
            name: item.name,
            price: item.price,
        })
      ),
      total: invoice.items.reduce((a, b) => a + b.price, 0)
    };
  }
}