import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E API Client", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("POST a client", async () => {
    const response = await request(app)
      .post("/client")
      .send({
        name: "Client 1",
        email: "client1@email.com",
        document: "Document client 1",
        street: "Street client 1",
        number: "num client 1",
        complement: "comp client 1",
        city: "City client 1",
        state: "State client 1",
        zipCode: "zipCode client 1"
      });
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Client 1");
    expect(response.body.email).toBe("client1@email.com");
    expect(response.body.document).toBe("Document client 1");
    expect(response.body.street).toBe("Street client 1");
    expect(response.body.number).toBe("num client 1");
    expect(response.body.complement).toBe("comp client 1");
    expect(response.body.city).toBe("City client 1");
    expect(response.body.state).toBe("State client 1");
    expect(response.body.zipCode).toBe("zipCode client 1");
  })
});