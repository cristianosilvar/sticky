export interface CreateOrderInput {
  userId: string;
  totalPrice: number;
  expiredAt?: Date;
}

export interface CreateOrderOutput {
  id: string;
  userId: string;
  orderStatus: string;
  totalPrice: number;
  expiredAt: Date | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
