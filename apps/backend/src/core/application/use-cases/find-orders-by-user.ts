import { logger } from "../../../infra/config/logger";
import { Either, left, right } from "../../../shared/utils/either";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { CreateOrderOutput } from "../dto/create-order-dto";

export class FindOrdersByUser {
  constructor(private orderRepository: OrderRepository) {}

  async execute(userId: string): Promise<Either<string, CreateOrderOutput[]>> {
    try {
      const orders = await this.orderRepository.findByUserId(userId);

      const ordersOutput = orders.map((order) => ({
        id: order.id,
        userId: order.userId,
        orderStatus: order.orderStatus,
        totalPrice: order.totalPrice,
        expiredAt: order.expiredAt,
        paidAt: order.paidAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));

      return right(ordersOutput);
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
