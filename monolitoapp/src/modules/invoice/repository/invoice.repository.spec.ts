import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import { InvoiceItemModel } from "./invoice.item.model";
import Item from "../domain/invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";

describe("Invoice repository integrated test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find invoice with one item", async () => {
    const invoice = await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "Docuement 1",
      addressStreet: "Address 1",
      addressNumber: "",
      addressComplement: "",
      addressCity: "",
      addressState: "",
      addressZipCode: "",
      items: [{
        id: "1",
        name: "Item 1",
        price: 50.0,
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [InvoiceItemModel ],
    });

    const repository = new InvoiceRepository();
    const result = await repository.find("1");

    expect(result.id.id).toBe(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.address.street).toBe(invoice.addressStreet);
  });

  it("should find invoice with more than one item", async () => {
    const invoice = await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "Docuement 1",
      addressStreet: "Address 1",
      addressNumber: "",
      addressComplement: "",
      addressCity: "",
      addressState: "",
      addressZipCode: "",
      items: [
        {
          id: "1",
          idInvoice: "1",
          name: "Item 1",
          price: 50.0,
        },{
          id: "2",
          idInvoice: "1",
          name: "Item 2",
          price: 30.8,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [ InvoiceItemModel ],
    });

    const repository = new InvoiceRepository();
    const result = await repository.find("1");

    expect(result.id.id).toBe(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.address.street).toBe(invoice.addressStreet);
    expect(result.items.length).toBeGreaterThan(1);
  });


  it("should generate an invoice with more than one item", async () => {
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "Docuement 1",
      address: {
        street: "Address 1",
        number: "",
        complement: "",
        city: "",
        state: "",
        zipCode: ""
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
    });

    const repository = new InvoiceRepository();
    await repository.generate(invoice);
    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [ InvoiceItemModel ]
    })

    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.addressStreet).toBe(invoice.address.street);
    expect(result.items.length).toBeGreaterThan(0);
  });
});