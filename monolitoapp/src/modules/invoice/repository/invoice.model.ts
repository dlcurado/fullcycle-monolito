import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import { InvoiceItemModel } from "./invoice.item.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})

export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;
  
  @Column({ allowNull: false })
  document: string;
  
  @Column({ allowNull: false })
  addressStreet: string;
  
  @Column({ allowNull: false })
  addressNumber: string;
  
  @Column({ allowNull: false })
  addressComplement: string;
  
  @Column({ allowNull: false })
  addressCity: string;
  
  @Column({ allowNull: false })
  addressState: string;
  
  @Column({ allowNull: false })
  addressZipCode: string;
  
  @HasMany(() => InvoiceItemModel)
  items: InvoiceItemModel[];

  @Column({ allowNull: false })
  createdAt: Date;
  
  @Column({ allowNull: false })
  updatedAt: Date;
}