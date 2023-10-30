import { Model, Column, Table, ForeignKey, } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { OrderModel } from "./order.model";

@Table({
  tableName: "order-product",
  timestamps: false,
})
export class OrderProductModel extends Model {
  @ForeignKey(() => OrderModel)
  @Column
  orderId: string;
  
  @ForeignKey(() => ProductModel)
  @Column
  productId: string;
}