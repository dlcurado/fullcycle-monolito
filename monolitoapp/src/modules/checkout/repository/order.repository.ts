import { CreatedAt } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { ClientModel } from "./client.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

export default class OrderRepository implements CheckoutGateway {
  async add(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      clientId: order.client.id.id,
      products: [
        order.products.map((p) => {
          id: p.id.id
        })
      ],
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }
  
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [ ClientModel, ProductModel ]
    });
    
    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(order.client.id),
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        street: order.client.street,
        number: order.client.number,
        complement: order.client.complement,
        city: order.client.city,
        state: order.client.state,
        zipCode: order.client.zipCode,
        createdAt: order.client.createdAt,
        updatedAt: order.client.updatedAt,
      }) ,
      products: order.products.map(
        (p) => {
          return new Product({
            id: new Id(p.id),
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          })
        }
        ),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }
}