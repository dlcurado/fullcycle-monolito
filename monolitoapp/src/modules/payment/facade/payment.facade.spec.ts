import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Client Adm Facade test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should create a transaction", async () => {
    const paymentFacade = PaymentFacadeFactory.create();
    

    const input = {
      orderId: "1",
      amount: 100,
    }

    const result = await paymentFacade.process(input);
    // const result = await ClientModel.findOne({
    //   where: { id: input.id }
    // });

    expect(result.transactionId).toBeDefined();
    expect(result.orderId).toBe("1");
    expect(result.amount).toBe(100);
    expect(result.status).toBe("approved");
  });

  
});