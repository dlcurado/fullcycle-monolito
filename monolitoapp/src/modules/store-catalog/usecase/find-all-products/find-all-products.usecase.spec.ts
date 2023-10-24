import Id from "../../../@shared/domain/value-object/id.value-object";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = {
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
}

const product2 = {
  id: new Id("2"),
  name: "Product 2",
  description: "Description 2",
  salesPrice: 100,
}

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    find: jest.fn(),
  }
}

describe("Find All products use case unit test", () => {
  it("should find more than one", async () => {
    const repository = MockRepository();
    const useCase = new FindAllProductsUseCase(repository);
    
    

    const result = await useCase.execute();

    expect(repository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBeGreaterThan(1);
    
    let resultProduct = result.products[0];
    expect(resultProduct.name).toBe(product1.name);
    expect(resultProduct.description).toBe(product1.description);
    expect(resultProduct.salesPrice).toBe(product1.salesPrice);
    
    resultProduct = result.products[1];
    expect(resultProduct.name).toBe(product2.name);
    expect(resultProduct.description).toBe(product2.description);
    expect(resultProduct.salesPrice).toBe(product2.salesPrice);
  });
});