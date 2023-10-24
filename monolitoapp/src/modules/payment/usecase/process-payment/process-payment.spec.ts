import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 10,
  orderId: "1",
  //status: "approved",
});

let MockRepository = {
  save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
}

describe("Process Payment use case unit test", () => {
  it("should process a payment", async() => {
    transaction.amount = 100;
    transaction.process();

    const repository = MockRepository;
    const useCase = new ProcessPaymentUseCase(repository);

    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await useCase.execute(input);

    expect(result.orderId).toBeDefined();
    expect(repository.save).toBeCalled();
    expect(result.transactionId).toEqual(transaction.id.id);
    expect(result.amount).toEqual(input.amount);
    expect(result.status).toEqual("approved");
    expect(result.createdAt).toEqual(transaction.createdAt);
    expect(result.updatedAt).toEqual(transaction.updatedAt);
  });

  it("should not process a payment with amount minor than 100", async() => {
    transaction.amount = 50;
    transaction.process();

    const repository = MockRepository;
    const useCase = new ProcessPaymentUseCase(repository);

    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await useCase.execute(input);

    expect(result.orderId).toBeDefined();
    expect(repository.save).toBeCalled();
    expect(result.transactionId).toEqual(transaction.id.id);
    expect(result.amount).toEqual(input.amount);
    expect(result.status).toEqual("declined");
    expect(result.createdAt).toEqual(transaction.createdAt);
    expect(result.updatedAt).toEqual(transaction.updatedAt);
  });

  it("should be pending when transaction is not processed", async() => {
    const input = new Transaction({
      id: new Id("1"),
      amount: 10,
      orderId: "1",
    });

    expect(input.orderId).toEqual("1");
    expect(input.id.id).toEqual("1");
    expect(input.amount).toEqual(10);
    expect(input.status).toEqual("pending");
  });

});