import { Either, left, right } from "../../../shared/utils/either";
import { TicketRepository } from "../../domain/repositories/ticket-repository";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { ShowtimeRepository } from "../../domain/repositories/showtime-repository";
import { Ticket } from "../../domain/entities/ticket-entity";
import {
  CreateTicketInput,
  CreateTicketOutput,
} from "../dto/create-ticket-dto";
import { logger } from "../../../infra/config/logger";

export class CreateTicket {
  constructor(
    private ticketRepository: TicketRepository,
    private orderRepository: OrderRepository,
    private showtimeRepository: ShowtimeRepository
  ) {}

  async execute(
    data: CreateTicketInput
  ): Promise<Either<string, CreateTicketOutput>> {
    try {
      // Validações
      if (!data.orderId) {
        return left("ID do pedido é obrigatório");
      }

      if (!data.showtimeId) {
        return left("ID da sessão é obrigatório");
      }

      if (data.price < 0) {
        return left("Preço deve ser maior ou igual a 0");
      }

      // Verificar se o pedido existe
      const order = await this.orderRepository.findById(data.orderId);
      if (!order) {
        return left("Pedido não encontrado");
      }

      // Verificar se o pedido está pago
      if (!order.isPaid()) {
        return left("Pedido deve estar pago para criar ingressos");
      }

      // Verificar se a sessão existe
      const showtime = await this.showtimeRepository.findById(data.showtimeId);
      if (!showtime) {
        return left("Sessão não encontrada");
      }

      // Verificar se a sessão está disponível
      if (!showtime.isAvailable()) {
        return left("Sessão não está disponível");
      }

      // Criar a entidade Ticket
      const ticket = new Ticket({
        orderId: data.orderId,
        showtimeId: data.showtimeId,
        price: data.price,
      });

      // Salvar no repositório
      const savedTicket = await this.ticketRepository.create(ticket);

      // Retornar o resultado
      return right({
        id: savedTicket.id,
        orderId: savedTicket.orderId,
        showtimeId: savedTicket.showtimeId,
        price: savedTicket.price,
        createdAt: savedTicket.createdAt,
        updatedAt: savedTicket.updatedAt,
      });
    } catch (error) {
      logger.error(error);
      return left("Erro interno do servidor");
    }
  }
}
