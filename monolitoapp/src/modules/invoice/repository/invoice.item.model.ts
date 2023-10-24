import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "invoices_item",
  timestamps: false,
})

export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column
  idInvoice: string;

  @BelongsTo(() => InvoiceModel)
  invoice: InvoiceModel;
  
  @Column({ allowNull: false })
  name: string;
  
  @Column({ allowNull: false })
  price: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}