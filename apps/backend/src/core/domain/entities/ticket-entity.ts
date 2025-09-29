import { BaseEntity } from "./base";

export interface TicketProps {
  orderId: string;
  showtimeId: string;
  price: number;
}

export class Ticket extends BaseEntity<TicketProps> {
  constructor(
    props: TicketProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt);
  }

  get orderId(): string {
    return this.props.orderId;
  }

  get showtimeId(): string {
    return this.props.showtimeId;
  }

  get price(): number {
    return this.props.price;
  }

  updatePrice(price: number): void {
    if (price < 0) {
      throw new Error("Preço deve ser maior ou igual a 0");
    }
    this.props.price = price;
    this.touch();
  }
}
