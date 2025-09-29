import { BaseEntity } from "./base";

export interface PaymentProps {
  orderId: string;
  price: number;
}

export class Payment extends BaseEntity<PaymentProps> {
  constructor(
    props: PaymentProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt);
  }

  get orderId(): string {
    return this.props.orderId;
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
