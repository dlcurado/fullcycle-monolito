import Id from "../../../@shared/domain/value-object/id.value-object";
import Item from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
  find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  generate: jest.fn()
}

describe("Find Invoice use case unite test", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository;
    const findUseCase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1"
    };

    const result = await findUseCase.execute(input);

    expect(repository.find).toBeCalled();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    
    expect(result.items.length).toBeGreaterThan(0);

    expect(result.createdAt).toBe(invoice.createdAt);
  });
})