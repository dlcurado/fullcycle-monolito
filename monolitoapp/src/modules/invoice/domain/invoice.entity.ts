import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import Item from "./invoice-item.entity";

type AddressProps = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

type InvoiceProps = {
  id: Id;
  name: string;
  document: string;
  address: AddressProps;
  items: Item[];
  //total: number; O invoice calculara o total baseado nos items
  createdAt: Date;
  updatedAt: Date;
}

export default class Invoice implements AggregateRoot {
  private _id: Id;
  private _name: string;
  private _document: string;
  private _address: AddressProps;
  private _items: Item[];
  private _total: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  
  constructor(props: InvoiceProps) {
    this._id = props.id;
    this._name = props.name;
    this._document = props.document;
    this._address = {
      street: props.address.street,
      number: props.address.number,
      complement: props.address.complement,
      city: props.address.city,
      state: props.address.state,
      zipCode: props.address.zipCode,
    }
    this._items = props.items;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this.validate();
  }

  validate(): void {
    if(this._items.length <= 0)
      throw new Error("The invoice must have almost one item to be generated!");

      this._items.forEach((item) => {
        this._total += item.price;
      });
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): AddressProps {
    return this._address;
  }

  get items(): Item[] {
    return this._items;
  }

  get total(): number {
    return this._total;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}