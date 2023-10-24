export interface PaymentFacadeInputDto {
  orderId: string;
  amount: number;
  status?: string;
}


export interface PaymentFacadeOutputDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}