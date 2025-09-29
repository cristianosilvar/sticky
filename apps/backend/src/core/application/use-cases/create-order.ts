import { Either, left, right } from "../../../shared/utils/either";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { UserRepository } from "../../domain/repositories/user-repository";
import { Order, OrderStatus } from "../../domain/entities/order-entity";
import { CreateOrderInput, CreateOrderOutput } from "../dto/create-order-dto";
import { logger } from "../../../infra/config/logger";

export class CreateOrder {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    data: CreateOrderInput
  ): Promise<Either<string, CreateOrderOutput>> {
    try {
      // Validações
      if (!data.userId) {
        return left("ID do usuário é obrigatório");
      }

      if (data.totalPrice < 0) {
        return left("Preço total deve ser maior ou igual a 0");
      }

      // Verificar se o usuário existe
      const user = await this.userRepository.findById(data.userId);
      if (!user) {
        return left("Usuário não encontrado");
      }

      // Definir data de expiração (30 minutos por padrão)
      const expiredAt = data.expiredAt || new Date(Date.now() + 30 * 60 * 1000);

      // Criar a entidade Order
      const order = new Order({
        userId: data.userId,
        orderStatus: OrderStatus.PENDING,
        totalPrice: data.totalPrice,
        expiredAt,
        paidAt: null,
      });

      // Salvar no repositório
      const savedOrder = await this.orderRepository.create(order);

      // Retornar o resultado
      return right({
        id: savedOrder.id,
        userId: savedOrder.userId,
        orderStatus: savedOrder.orderStatus,
        totalPrice: savedOrder.totalPrice,
        expiredAt: savedOrder.expiredAt,
        paidAt: savedOrder.paidAt,
        createdAt: savedOrder.createdAt,
        updatedAt: savedOrder.updatedAt,
      });
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
