import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import { AddOrderInputDto, AddOrderOutputDto } from "./add-order.dto";
import { PaymentFacadeInterface } from "../../../payment/facade/payment.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interaface";
import CheckoutGateway from "../../gateway/checkout.gateway";

export default class AddOrderUseCase implements UseCaseInterface {
  constructor(
    private clientFacade: ClientAdmFacadeInterface,
    private productFacade: ProductAdmFacadeInterface,
    private catalogFacade: StoreCatalogFacadeInterface,
    private invoiceFacade: InvoiceFacadeInterface,
    private paymentFacade: PaymentFacadeInterface,
    private repository: CheckoutGateway
  ){}

  async execute(input: AddOrderInputDto): Promise<AddOrderOutputDto> {
    // Busca o cliente
    const client = await this.clientFacade.find({ id: input.clientId });
    
    if(!client){
      throw new Error("Client not found");
    }
      
    // Valida se todos os produtos são validos
    await this.validateProducts(input);

    // Pega os produtos
    const orderProducts = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    );

    // Cria Client
    const orderClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
    });

    // Cria Order
    const order = new Order({
      client: orderClient,
      products: orderProducts
    });

    // PaymentFacade Process
    const payment = await this.paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    })

    // Se pagamento aprovado, Gerar Invoice
    const invoice = 
      payment.status === "approved" ?
        await this.invoiceFacade.create({
          name: client.name,
          document: client.document,
          street: client.street,
          number: client.number,
          complement: client.complement,
          city: client.city,
          state: client.state,
          zipCode: client.zipCode,
          items: orderProducts.map((p) => {
            return {
              id: p.id.id,
              name: p.name,
              price: p.salesPrice
            }
          }),
        })
        : null;

    // Altera status da order para approved
    payment.status === "approved" && order.approved();
    this.repository.add(order)

    return {
      id: order.id.id,
      invoiceId: payment.status === "approved" ? invoice.id : null,
      status: order.status,
      total: order.total,
      products: order.products.map((p) => {
        return {
          productId: p.id.id,
        }
      }),
    }
  }
  
  private async validateProducts(input: AddOrderInputDto): Promise<void> {
    if(input.products.length === 0){
      throw new Error("No products selected.");
    }

    for(const p of input.products) {
      const product = await this.productFacade.checkStock({
        productId: p.productId,
      });

      if(product.stock <= 0){
        throw new Error("Product is not available in stock.")
      }
    }
  }

  private async getProduct(id: string): Promise<Product> {
    const product = await this.catalogFacade.find({
      id: id
    });

    if(!product){
      throw new Error("Product not found.");
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    });    
  }

  //private async process(input: )
}