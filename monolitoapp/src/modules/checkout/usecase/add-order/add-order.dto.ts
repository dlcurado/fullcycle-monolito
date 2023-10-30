export interface AddOrderInputDto {
  clientId: string;
  products: {
    productId?: string;
  }[];
}

export interface AddOrderOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string
  }[];
}