import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaOrderRepository } from "../../../repositories/prisma-order-repository";
import { FindOrdersByUser } from "../../../../core/application/use-cases/find-orders-by-user";

export class FindOrdersByUserController {
  /**
   * @swagger
   * /orders/user/{userId}:
   *   get:
   *     summary: Busca pedidos de um usuário específico
   *     tags:
   *       - Pedidos
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Lista de pedidos do usuário retornada com sucesso
   *       500:
   *         description: Erro interno do servidor
   */
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const prisma = new PrismaClient();
    const repository = new PrismaOrderRepository(prisma);
    const useCase = new FindOrdersByUser(repository);

    const orders = await useCase.execute(userId);

    await prisma.$disconnect();

    if (orders.isLeft()) {
      return res.status(500).json({ message: orders.value });
    }

    return res.status(200).json(orders.value);
  }
}
