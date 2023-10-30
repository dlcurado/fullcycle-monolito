import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel } from "../repository/invoice.item.model";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Ivoice Facade test", () => {
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
  
  it("should create a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Client 1",
      document: "CPF",
      street: "Street client 1",
      number: "123",
      complement: "123D",
      city: "City 1",
      state: "State 1",
      zipCode: "zip123", 
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 10
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await invoiceFacade.create(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.items.length).toBeGreaterThan(0);

  });

  it("should find a invoice", async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: "Client 1",
      document: "CPF",
      street: "Street client 1",
      number: "123",
      complement: "123D",
      city: "City 1",
      state: "State 1",
      zipCode: "zip123", 
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 10
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const invoiceGenerated = await invoiceFacade.create(input);

    const result = await invoiceFacade.find({
      id: invoiceGenerated.id
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.address.street).toBe(input.street);
    expect(result.items.length).toBeGreaterThan(0);
  });
});