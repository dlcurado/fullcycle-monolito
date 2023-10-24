import Id from "../../@shared/domain/value-object/id.value-object";
import Item from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice.item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      addressStreet: invoice.address.street,
      addressNumber: invoice.address.number,
      addressComplement: invoice.address.complement,
      addressCity: invoice.address.city,
      addressState: invoice.address.state,
      addressZipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price
        })
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [ InvoiceItemModel ],
    });
  }
  
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ 
      where: { id },
      include: [InvoiceItemModel]
    });

    if(!invoice)
      throw new Error("Invoice not founded!");

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      address: {
        street: invoice.addressStreet,
        number: "",
        complement: "",
        city: "",
        state: "",
        zipCode: ""
      },
      document: invoice.document,
      items: invoice.items.map(
        (item) => (
          new Item({
            id: new Id(item.id),
            name: item.name,
            price: item.price
          })
        )
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

}