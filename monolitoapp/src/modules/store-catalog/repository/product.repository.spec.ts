import { Sequelize } from "sequelize-typescript";
import { ProductModel} from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductRespository from "./product.repository"

describe("", () => {
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

  it("should find more than one product", async () => {
    const product1 = new Product({
      id: new Id(),
      name: "Name 1",
      description: "Description 1",
      salesPrice: 100,
    });
    const product2 = new Product({
      id: new Id(),
      name: "Name 2",
      description: "Description 2",
      salesPrice: 80,
    });

    const repository = new ProductRespository();
    await repository.add(product1);
    await repository.add(product2);

    const result = await repository.findAll();

    expect(result.length).toBeGreaterThan(1);
    
    let resultProduct = result[0];
    expect(resultProduct.id.id).toBe(product1.id.id);
    expect(resultProduct.name).toBe(product1.name);
    expect(resultProduct.description).toBe(product1.description);
    expect(resultProduct.salesPrice).toBe(product1.salesPrice);
    
    resultProduct = result[1];
    expect(resultProduct.id.id).toBe(product2.id.id);
    expect(resultProduct.name).toBe(product2.name);
    expect(resultProduct.description).toBe(product2.description);
    expect(resultProduct.salesPrice).toBe(product2.salesPrice);
  })

  it("should find a product", async () => {
    const product1 = new Product({
      id: new Id(),
      name: "Name 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const repository = new ProductRespository();
    await repository.add(product1);

    const result = await repository.find(product1.id.id);
    expect(result.id.id).toBe(product1.id.id);
    expect(result.name).toBe(product1.name);
    expect(result.description).toBe(product1.description);
    expect(result.salesPrice).toBe(product1.salesPrice);
  })
});