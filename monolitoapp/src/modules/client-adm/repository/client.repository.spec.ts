import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientAdm from "../domain/client.entity";
import ClientRepository from "./client.repository";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client repository integrated test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const input = new ClientAdm({
      id: new Id("1"),
      name: "Name 1",
      email: "client1@email.com",
      document: "",
      street: "Address 1",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const repository = new ClientRepository();
    await repository.add(input);
    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.id).toBe(input.id.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.street).toBe(input.street);
    expect(client.createdAt).toStrictEqual(input.createdAt);
    expect(client.updatedAt).toStrictEqual(input.updatedAt);
  })

  it("should find a client", async () => {
    const client = await ClientModel.create( {
      id: "1",
      name: "Name 1",
      email: "client1@email.com",
      document: "",
      street: "Address 1",
      number: "",
      complement: "",
      city: "",
      state: "",
      zipCode: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const repository = new ClientRepository();

    const result = await repository.find(client.id)

    expect(result.id.id).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.street).toBe(client.street);
  })
});