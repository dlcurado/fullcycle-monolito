import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe("Add product use case unit test", () => {
  it("should add a product", async () => {
    //const repository = new ProductRepository();
    const repository = MockRepository();
    const useCase = new AddProductUseCase(repository);
    
    const input = {
      name: "Product 1",
      description: "Description 1",
      purchasedPrice: 100,
      stock: 10,
    }

    const result = await useCase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasedPrice).toBe(input.purchasedPrice);
    expect(result.stock).toBe(input.stock);

  });
});