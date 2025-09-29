import { BaseEntity } from "./base";

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export interface OrderProps {
  userId: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  expiredAt: Date | null;
  paidAt: Date | null;
}

export class Order extends BaseEntity<OrderProps> {
  constructor(
    props: OrderProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt);
  }

  get userId(): string {
    return this.props.userId;
  }

  get orderStatus(): OrderStatus {
    return this.props.orderStatus;
  }

  get totalPrice(): number {
    return this.props.totalPrice;
  }

  get expiredAt(): Date | null {
    return this.props.expiredAt;
  }

  get paidAt(): Date | null {
    return this.props.paidAt;
  }

  updateTotalPrice(totalPrice: number): void {
    if (totalPrice < 0) {
      throw new Error("Preço total deve ser maior ou igual a 0");
    }
    this.props.totalPrice = totalPrice;
    this.touch();
  }

  updateOrderStatus(status: OrderStatus): void {
    this.props.orderStatus = status;
    this.touch();
  }

  setExpiredAt(expiredAt: Date): void {
    this.props.expiredAt = expiredAt;
    this.touch();
  }

  setPaidAt(paidAt: Date): void {
    this.props.paidAt = paidAt;
    this.touch();
  }

  markAsPaid(): void {
    this.updateOrderStatus(OrderStatus.PAID);
    this.setPaidAt(new Date());
  }

  markAsCancelled(): void {
    this.updateOrderStatus(OrderStatus.CANCELLED);
  }

  markAsExpired(): void {
    this.updateOrderStatus(OrderStatus.EXPIRED);
  }

  isPending(): boolean {
    return this.orderStatus === OrderStatus.PENDING;
  }

  isPaid(): boolean {
    return this.orderStatus === OrderStatus.PAID;
  }

  isCancelled(): boolean {
    return this.orderStatus === OrderStatus.CANCELLED;
  }

  isExpired(): boolean {
    return this.orderStatus === OrderStatus.EXPIRED;
  }

  isExpiredByTime(): boolean {
    if (!this.expiredAt) return false;
    return new Date() > this.expiredAt;
  }
}
