import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ClientModel } from "./client.model";
import { ProductModel } from "./product.model";
import { OrderProductModel } from "./order.product.model";
import OrderRepository from "./order.repository";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";

describe("Order Repository test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel, ClientModel, ProductModel, OrderProductModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const client = {
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
  };

  const product1 = {
    id: "1",
    name: "Name 1",
    description: "Description 1",
    salesPrice: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const product2 = {
    id: "2",
    name: "Name 2",
    description: "Description 2",
    salesPrice: 24,
    createdAt: new Date(),
    updatedAt: new Date(),
  };


  const input = {
    id: "o1",
    clientId: client.id,
    products: [ 
      new Product({
        id: new Id("1"),
        name: "Name 1",
        description: "Description 1",
        salesPrice: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new Product({
        id: new Id("2"),
        name: "Name 2",
        description: "Description 2",
        salesPrice: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ],
    status: "approved",
    createdAt: new Date(),
    updatedAt: new Date(),
  };


  it("shloud create an order", async () => {
    await ClientModel.create(client);
    await ProductModel.create(product1);
    await ProductModel.create(product2);

    const repository = new OrderRepository();
    await repository.add(
      new Order({
        id: new Id("o1"),
        client: new Client({
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
        }),
        products: [ 
          new Product({
            id: new Id("1"),
            name: "Name 1",
            description: "Description 1",
            salesPrice: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
          new Product({
            id: new Id("2"),
            name: "Name 2",
            description: "Description 2",
            salesPrice: 24,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
         ],
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const output = await OrderModel.findOne({
      where: { id: "o1" },
      include: [ ClientModel, ProductModel ]
    });

    expect(output.id).toBe(input.id);
    expect(output.client.id).toBe(input.clientId);
    //expect(output.products.length).toBe(1);
    expect(output.status).toBe("approved");
  });


  it("shloud find an order with more than one product", async () => {
    await ClientModel.create(client);
    await ProductModel.create(product1);
    await ProductModel.create(product2);

    await OrderModel.create(input);

    const repository = new OrderRepository();
    const output = await repository.find("o1");

    expect(output).not.toBeNull();
    expect(output.id.id).toBe(input.id);
    //expect(output.products.length).toBe(1);
  });
});