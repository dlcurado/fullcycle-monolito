import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/product-adm.facade.factory";

describe("ProductAdmFacade test", () => {
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
  
  it("should create a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "123",
      name: "",
      description: "",
      purchasePrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input);
    const result = await ProductModel.findOne({
      where: { id: input.id }
    });

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
  });

  it("should return product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "123",
      name: "",
      description: "",
      purchasePrice: 100,
      stock: 10
    }

    const findInput = {
      productId: "123",
    }

    await productFacade.addProduct(input);
    
    const result = await productFacade.checkStock(findInput);

    expect(result.productId).toEqual(input.id);
    expect(result.stock).toEqual(input.stock);
  });
});