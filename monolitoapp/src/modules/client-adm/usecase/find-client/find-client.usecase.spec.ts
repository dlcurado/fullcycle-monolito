import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientAdm from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new ClientAdm({
  id: new Id("1"),
  name: "Client 1",
  email: "client1@email.com",
  document: "",
  street: "Address Client 1",
  number: "",
  complement: "",
  city: "",
  state: "",
  zipCode: "",
});

const MockRepository = {
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
}

describe("Find Client use case unit test", () => {
  it("should find a client", async() => {
    const repository = MockRepository;
    const useCase = new FindClientUseCase(repository);

    const input = {
      id: "1"
    };

    const result = await useCase.execute(input);

    expect(repository.find).toBeCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
  });
});