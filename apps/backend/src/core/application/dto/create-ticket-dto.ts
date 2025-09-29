export interface CreateTicketInput {
  orderId: string;
  showtimeId: string;
  price: number;
}

export interface CreateTicketOutput {
  id: string;
  orderId: string;
  showtimeId: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
