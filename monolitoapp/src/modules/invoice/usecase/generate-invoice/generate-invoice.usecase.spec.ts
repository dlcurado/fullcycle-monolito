import Id from "../../../@shared/domain/value-object/id.value-object";
import Item from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "Client 1",
  document: "CPF",
  address: {
    street: "Street client 1",
    number: "123",
    complement: "123D",
    city: "City 1",
    state: "State 1",
    zipCode: "zip123", 
  },
  items: [
    new Item({
      id: new Id("1"),
      name: "Item 1",
      price: 10
    }),
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
});

const MockRepository = {
  find: jest.fn(),
  generate: jest.fn().mockReturnValue(Promise.resolve(invoice))
}

describe("Generate Invoice use case unite test", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository;
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);


    const result = await generateInvoiceUseCase.execute({
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
        },
      ],
    });

    expect(repository.generate).toBeCalled();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.state).toBe(invoice.address.state);
    expect(result.city).toBe(invoice.address.city);
    expect(result.zipCode).toBe(invoice.address.zipCode);
    
    expect(result.items.length).toBeGreaterThan(0);
  });
})