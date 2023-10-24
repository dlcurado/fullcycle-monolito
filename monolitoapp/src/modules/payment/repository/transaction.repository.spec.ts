import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { TransactionModel } from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Transaction from "../domain/transaction.entity";

describe("Transaction repository integrated test", () => {
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

  it("should save a transaction", async () => {
    const input = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    })

    // const input2 = new Transaction({
    //   id: new Id("2"),
    //   amount: 50,
    //   orderId: "2",
    // })

    const repository = new TransactionRepository();
    await repository.save(input);
    //await repository.save(input2);
    const transaction = await TransactionModel.findOne({ where: { id: "1" } });

    expect(transaction).toBeDefined();
    expect(transaction.id).toBe(input.id.id);
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.status).toBe(input.status);
    expect(transaction.createdAt).toStrictEqual(input.createdAt);
    expect(transaction.updatedAt).toStrictEqual(input.updatedAt);
  })

  
});