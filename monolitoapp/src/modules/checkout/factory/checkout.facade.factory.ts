import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/product-adm.facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/store-catalog.facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutFacadeInterface from "../facade/checkout.facade.interface";
import OrderRepository from "../repository/order.repository";
import AddOrderUseCase from "../usecase/add-order/add-order.usecase";

export default class CheckoutFacadeFactory {
  static create(): CheckoutFacadeInterface {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
  
    const repository = new OrderRepository();
    
    const addOrderUseCase = new AddOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      invoiceFacade,
      paymentFacade,
      repository
    );
    
    const orderFacade = new CheckoutFacade({
      addUseCase: addOrderUseCase,
    });

    return orderFacade;
  }
}