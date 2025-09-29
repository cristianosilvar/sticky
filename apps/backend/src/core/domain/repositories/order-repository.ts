import { Order } from "../entities/order-entity";

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  findByStatus(status: string): Promise<Order[]>;
  findExpired(): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
