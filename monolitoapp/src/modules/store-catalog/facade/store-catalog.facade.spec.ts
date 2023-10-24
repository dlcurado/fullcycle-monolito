import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/store-catalog.facade.factory";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe("Store Catalog facade integrated test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should find one product", async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    await ProductModel.create(
      {
        id: "123",
        name: "Product 1",
        description: "Description 1",
        salesPrice: 60,
      }
    )

    const input = {
      id: "123"
    }

    const result = await storeCatalogFacade.find(input);

    expect(result.id).toEqual("123");
    expect(result.name).toEqual("Product 1");
  });

  it("should find all products", async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    await ProductModel.create(
      {
        id: "123",
        name: "Product 1",
        description: "Description 1",
        salesPrice: 60,
      }
    )

    await ProductModel.create(
      {
        id: "234",
        name: "Product 2",
        description: "Description 2",
        salesPrice: 48,
      }
    )

    const result = await storeCatalogFacade.findAll();

    expect(result.products.length).toEqual(2);

    let product = result.products[0];
    expect(product.id).toEqual("123");
    expect(product.name).toEqual("Product 1");

    // product = result.products[1];
    // expect(product.id).toEqual("234");
    // expect(product.name).toEqual("Product 2");
  });
});