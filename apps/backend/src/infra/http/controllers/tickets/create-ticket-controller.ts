import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaTicketRepository } from "../../../repositories/prisma-ticket-repository";
import { PrismaOrderRepository } from "../../../repositories/prisma-order-repository";
import { PrismaShowtimeRepository } from "../../../repositories/prisma-showtime-repository";
import { CreateTicket } from "../../../../core/application/use-cases/create-ticket";

export class CreateTicketController {
  /**
   * @swagger
   * /tickets:
   *   post:
   *     summary: Cria um novo ingresso
   *     tags:
   *       - Ingressos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - orderId
   *               - showtimeId
   *               - price
   *             properties:
   *               orderId:
   *                 type: string
   *                 description: ID do pedido
   *               showtimeId:
   *                 type: string
   *                 description: ID da sessão
   *               price:
   *                 type: number
   *                 minimum: 0
   *                 description: Preço do ingresso
   *     responses:
   *       201:
   *         description: Ingresso criado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async handle(req: Request, res: Response) {
    const { orderId, showtimeId, price } = req.body;

    const prisma = new PrismaClient();
    const ticketRepository = new PrismaTicketRepository(prisma);
    const orderRepository = new PrismaOrderRepository(prisma);
    const showtimeRepository = new PrismaShowtimeRepository(prisma);
    const useCase = new CreateTicket(
      ticketRepository,
      orderRepository,
      showtimeRepository
    );

    const ticket = await useCase.execute({
      orderId,
      showtimeId,
      price,
    });

    await prisma.$disconnect();

    if (ticket.isLeft()) {
      return res.status(400).json({ message: ticket.value });
    }

    return res.status(201).json(ticket.value);
  }
}
