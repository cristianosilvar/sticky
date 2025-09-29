import { Either, left, right } from "../../../shared/utils/either";
import { PaymentRepository } from "../../domain/repositories/payment-repository";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { Payment } from "../../domain/entities/payment-entity";
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from "../dto/create-payment-dto";
import { logger } from "../../../infra/config/logger";

export class CreatePayment {
  constructor(
    private paymentRepository: PaymentRepository,
    private orderRepository: OrderRepository
  ) {}

  async execute(
    data: CreatePaymentInput
  ): Promise<Either<string, CreatePaymentOutput>> {
    try {
      // Validações
      if (!data.orderId) {
        return left("ID do pedido é obrigatório");
      }

      if (data.price < 0) {
        return left("Preço deve ser maior ou igual a 0");
      }

      // Verificar se o pedido existe
      const order = await this.orderRepository.findById(data.orderId);
      if (!order) {
        return left("Pedido não encontrado");
      }

      // Verificar se o pedido não está pago
      if (order.isPaid()) {
        return left("Pedido já está pago");
      }

      // Verificar se o pedido não está cancelado
      if (order.isCancelled()) {
        return left("Pedido está cancelado");
      }

      // Verificar se o pedido não expirou
      if (order.isExpiredByTime()) {
        return left("Pedido expirado");
      }

      // Criar a entidade Payment
      const payment = new Payment({
        orderId: data.orderId,
        price: data.price,
      });

      // Salvar no repositório
      const savedPayment = await this.paymentRepository.create(payment);

      // Marcar pedido como pago
      order.markAsPaid();
      await this.orderRepository.update(order);

      // Retornar o resultado
      return right({
        id: savedPayment.id,
        orderId: savedPayment.orderId,
        price: savedPayment.price,
        createdAt: savedPayment.createdAt,
        updatedAt: savedPayment.updatedAt,
      });
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
