import { DatabaseError } from "sequelize";
import { AddOrderInputDto } from "./add-order.dto";
import AddOrderUseCase from "./add-order.usecase";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

const mockDate = new Date(2000, 1, 1);

describe("Place order use case unit test", () => {
  describe("validateProducts methods", () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new AddOrderUseCase();

    it("should throw an Error when products does not excists", async() => {
      const product: AddOrderInputDto = {
        clientId: "0",
        products: []
      }

      await expect(placeOrderUseCase["validateProducts"](product)).rejects.toThrowError(
        "No products selected."
      );
    });

    it("should throw an error when product is out of stock", async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({productId}:{productId: string}) => 
          Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1,
          })
        )
      };

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["productFacade"] = mockProductFacade;

      let input: AddOrderInputDto= {
        clientId: "1",
        products: [{ productId: "1" }]
      };
      
      await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
        new Error("Product is not available in stock.")
      );

      input = {
        clientId: "1",
        products: [{ productId: "0" }, { productId: "1" }]
      };
      
      await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
        new Error("Product is not available in stock.")
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

      input = {
        clientId: "1",
        products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }]
      };
      
      await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
        new Error("Product is not available in stock.")
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
    });
  });
  
  describe("getProducts method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate)
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new AddOrderUseCase();

    it("should throw error when product not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null)
      };

      //@ts-expect-error - no params in constructor
      placeOrderUseCase["catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrowError(
        "Product not found"
      );
    });    

    it("should return a product", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: "0",
          name: "Product 0",
          description: "Descriptio 0",
          salesPrice: 0
        })
      };

      //@ts-expect-error - no params in constructor
      placeOrderUseCase["catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
        new Product({
          id: new Id("0"),
          name: "Product 0",
          description: "Descriptio 0",
          salesPrice: 0
        })
      );
    });
  });


  describe("Order", () => {
    const clientProps = {
      id: "1",
      name: "Client 1",
      document: "doc1",
      email: "email1",
      street: "Street 1",
      number: "111",
      complement: "casa 1",
      city: "City 1",
      state: "State 1",
      zipCode: "zip1",
    };

    const mockClientFacade = {
      find: jest.fn().mockResolvedValue(clientProps),
      add: jest.fn()
    }; 

    let mockPaymentFacade = {
      process: jest.fn()
    };

    const mockInvoiceFacade = {
      find: jest.fn().mockResolvedValue({ invoiceId: null }),
      create: jest.fn().mockResolvedValue({ id: "1i" })
    };

    const mockCheckoutRepo = {
      find: jest.fn(),
      add: jest.fn()
    };


    const placeOrderUseCase = new AddOrderUseCase(
      mockClientFacade,
      null,
      null,
      mockInvoiceFacade,
      mockPaymentFacade,
      mockCheckoutRepo
    );

    const products = {
      "1": new Product({
        id: new Id("1"),
        name: "Product 1",
        description: "Description 1",
        salesPrice: 40
      }),
      "2": new Product({
        id: new Id("2"),
        name: "Product 2",
        description: "Description 2",
        salesPrice: 30
      }),
    };

    const mockValidateProducts = jest
      //@ts-expect-error - spy on private method 
      .spyOn(placeOrderUseCase, "validateProducts")
      //@ts-expect-error - spy on private method
      .mockResolvedValue(null);

    const mockGetProduct = jest
      //@ts-expect-error - spy on getProduct 
      .spyOn(placeOrderUseCase, "getProduct")
      //@ts-expect-error - spy on getProduct - null
      .mockImplementation((productId: keyof typeof products) => {
        return products[productId]
      });
    
    
    it("should not be approved", async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: "1t",
        orderId: "1o",
        amout: 70,
        status: "error",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: AddOrderInputDto = {
        clientId: "1c",
        products: [{ productId: "1"}, { productId: "2"}]
      };

      let output = await placeOrderUseCase.execute(input);

      expect(output.invoiceId).toBeNull();
      expect(output.total).toBe(70);
      expect(output.products).toStrictEqual([
        { productId: "1"}, 
        { productId: "2"}
      ]);

      expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c"});

      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
      expect(mockValidateProducts).toHaveBeenCalledWith(input);

      expect(mockGetProduct).toHaveBeenCalledTimes(2);

      expect(mockCheckoutRepo.add).toHaveBeenCalledTimes(1);

      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      });

      expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(0);
    });


    it("should be approved", async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: "1t",
        orderId: "1o",
        amout: 100,
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: AddOrderInputDto = {
        clientId: "1c",
        products: [{ productId: "1"}, { productId: "2"}]
      };

      let output = await placeOrderUseCase.execute(input);

      expect(output.invoiceId).toBe("1i");
      expect(output.total).toBe(70);
      expect(output.products).toStrictEqual([
        { productId: "1"}, 
        { productId: "2"}
      ]);

      expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c"});

      expect(mockValidateProducts).toHaveBeenCalledTimes(1);

      expect(mockGetProduct).toHaveBeenCalledTimes(2);

      expect(mockCheckoutRepo.add).toHaveBeenCalledTimes(1);

      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      });

      expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(1);
      expect(mockInvoiceFacade.create).toHaveBeenCalledWith({
        name: clientProps.name,
        document: clientProps.document,
        street: clientProps.street,
        number: clientProps.number,
        complement: clientProps.complement,
        city: clientProps.city,
        state: clientProps.state,
        zipCode: clientProps.zipCode,
        items: [
          {
            id: products["1"].id.id,
            name: products["1"].name,
            price: products["1"].salesPrice,
          },{
            id: products["2"].id.id,
            name: products["2"].name,
            price: products["2"].salesPrice,
          }
        ],
      });
    });  

  });
});