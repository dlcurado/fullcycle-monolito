import AddClientUseCase from "./add-client.usecase";

const MockRepository = {
  add: jest.fn(),
  find: jest.fn(),
}

describe("Add Client use case unit test", () => {
  it("should add a client without id", async() => {
    const repository = MockRepository;
    const useCase = new AddClientUseCase(repository);

    const input = {
      name: "Client 1",
      email: "client1@email.com",
      address: "Address Client 1"
    };

    const result = await useCase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual("Client 1");
  });

  it("should add a client with id", async() => {
    const repository = MockRepository;
    const useCase = new AddClientUseCase(repository);

    const input = {
      id: "1",
      name: "Client 1",
      email: "client1@email.com",
      address: "Address Client 1"
    };

    const result = await useCase.execute(input);

    expect(result.id).toBe("1");
    expect(result.name).toEqual("Client 1");
  });
});