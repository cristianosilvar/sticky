export interface CreatePaymentInput {
  orderId: string;
  price: number;
}

export interface CreatePaymentOutput {
  id: string;
  orderId: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
