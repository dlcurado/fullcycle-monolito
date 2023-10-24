import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client Adm Facade test", () => {
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
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: "123",
      name: "Client 1",
      email: "client1@email.com",
      address: "Address 1"
    }

    await clientFacade.add(input);
    const result = await ClientModel.findOne({
      where: { id: input.id }
    });

    expect(result.id).toEqual(input.id);
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    await ClientModel.create(
      {
        id: "123",
        name: "Client 1",
        email: "client1@email.com",
        address: "Address 1",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    );

    const findInput = {
      id: "123",
    }
    
    const result = await clientFacade.find(findInput);

    expect(result.id).toEqual("123");
    expect(result.name).toEqual("Client 1");
  });
});