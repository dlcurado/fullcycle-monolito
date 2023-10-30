import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E API Product", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("POST a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        description: "Description product 1",
        purchasePrice: 20.40,
        stock: 20
      });
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Description product 1");
    expect(response.body.purchasePrice).toBe(20.40);
    expect(response.body.stock).toBe(20);
  })
});