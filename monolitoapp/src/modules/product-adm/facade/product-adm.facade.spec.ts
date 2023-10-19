import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import { NIL } from "uuid";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import ProductAdmFacadeFactory from "../factory/facade.factory";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

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
    // const repository = new ProductRepository();
    // const addProductUseCase = new AddProductUseCase(repository);
    // const checkStockUseCase = new CheckStockUseCase();
    // const productFacade = new ProductAdmFacade({
    //   addUseCase: addProductUseCase,
    //   checkStockUseCase: checkStockUseCase,
    // });

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "123",
      name: "",
      description: "",
      purchasedPrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input);
    const result = await ProductModel.findOne({
      where: { id: input.id }
    });

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
  });
});