import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaOrderRepository } from "../../../repositories/prisma-order-repository";
import { PrismaUserRepository } from "../../../repositories/prisma-user-repository";
import { CreateOrder } from "../../../../core/application/use-cases/create-order";

export class CreateOrderController {
  /**
   * @swagger
   * /orders:
   *   post:
   *     summary: Cria um novo pedido
   *     tags:
   *       - Pedidos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - totalPrice
   *             properties:
   *               userId:
   *                 type: string
   *                 description: ID do usuário
   *               totalPrice:
   *                 type: number
   *                 minimum: 0
   *                 description: Preço total do pedido
   *               expiredAt:
   *                 type: string
   *                 format: date-time
   *                 description: Data de expiração (opcional)
   *     responses:
   *       201:
   *         description: Pedido criado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async handle(req: Request, res: Response) {
    const { userId, totalPrice, expiredAt } = req.body;

    const prisma = new PrismaClient();
    const orderRepository = new PrismaOrderRepository(prisma);
    const userRepository = new PrismaUserRepository(prisma);
    const useCase = new CreateOrder(orderRepository, userRepository);

    const order = await useCase.execute({
      userId,
      totalPrice,
      expiredAt: expiredAt ? new Date(expiredAt) : undefined,
    });

    await prisma.$disconnect();

    if (order.isLeft()) {
      return res.status(400).json({ message: order.value });
    }

    return res.status(201).json(order.value);
  }
}
