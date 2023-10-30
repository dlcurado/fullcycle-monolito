import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E API Invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("GET an invoice", async () => {
  })
});