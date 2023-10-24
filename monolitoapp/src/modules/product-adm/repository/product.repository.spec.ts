import { Sequelize } from "sequelize-typescript";
import { ProductModel} from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductRespository from "./product.repository"

describe("Product repository integrated test", () => {
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
    const productProps = {
      id: new Id(),
      name: "Name 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
    }

    const product = new Product(productProps);
    const repository = new ProductRespository();
    await repository.add(product);

    const result = await ProductModel.findOne({
      where: { id: product.id.id },
    })

    expect(productProps.id.id).toBe(result.id);
    expect(productProps.name).toBe(result.name);
    expect(productProps.description).toBe(result.description);
    expect(productProps.purchasePrice).toBe(result.purchasePrice);
    expect(productProps.stock).toBe(result.stock);
  })

  it("should find a product", async () => {
    const _id = "123456";

    ProductModel.create({
      id: _id,
      name: "Name 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const repository = new ProductRespository();
    const result = await repository.find(_id);

    expect(result.id.id).toEqual(_id);
    expect(result.name).toEqual("Name 1");
    expect(result.description).toEqual("Description 1");
    expect(result.purchasePrice).toEqual(100);
    expect(result.stock).toEqual(10);
  })
});