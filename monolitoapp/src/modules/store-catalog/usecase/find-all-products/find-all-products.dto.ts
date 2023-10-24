export interface FindAllProductsInputDto {
  id?: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllProductsOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[]
  
}

