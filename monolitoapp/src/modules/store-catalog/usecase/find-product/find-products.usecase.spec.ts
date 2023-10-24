import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-products.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
})

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  }
}

describe("Find product use case unit test", () => {
  it("should find product", async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);
    
    const input = {
      id: "1"
    }

    const result = await useCase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.name).toBe(product.name);
    expect(result.description).toBe(product.description);
    expect(result.salesPrice).toBe(product.salesPrice);
  });
});