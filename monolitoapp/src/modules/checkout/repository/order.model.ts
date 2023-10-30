import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ProductModel } from "./product.model";
import { OrderProductModel } from "./order.product.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  clientId: string;
  
  @BelongsTo(() => ClientModel)
  client: ClientModel;
  
  @BelongsToMany(() => ProductModel, () => OrderProductModel)
  products: ProductModel[];

  @Column({ allowNull: false })
  status: string;
  
  @Column({ allowNull: false })
  createdAt: Date;
  
  @Column({ allowNull: false })
  updatedAt: Date;
}