export interface AddOrderFacadeInputDto {
  clientId: string;
  products: {
    productId?: string;
  }[];
}

export interface AddOrderFacadeOutputDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string
  }[];
}