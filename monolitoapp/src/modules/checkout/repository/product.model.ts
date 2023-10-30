import { Model, Column, PrimaryKey, Table, HasMany, BelongsToMany, BelongsTo } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { OrderProductModel } from "./order.product.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;
  
  @Column({ allowNull: false })
  description: string;
  
  @Column({ allowNull: false })
  salesPrice: number;
  
  @BelongsToMany(() => OrderModel, () => OrderProductModel)
  orders: OrderModel[];

  @Column({ allowNull: false })
  createdAt: Date;
  
  @Column({ allowNull: false })
  updatedAt: Date;
}