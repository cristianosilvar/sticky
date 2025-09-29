import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaPaymentRepository } from "../../../repositories/prisma-payment-repository";
import { PrismaOrderRepository } from "../../../repositories/prisma-order-repository";
import { CreatePayment } from "../../../../core/application/use-cases/create-payment";

export class CreatePaymentController {
  /**
   * @swagger
   * /payments:
   *   post:
   *     summary: Cria um novo pagamento
   *     tags:
   *       - Pagamentos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - orderId
   *               - price
   *             properties:
   *               orderId:
   *                 type: string
   *                 description: ID do pedido
   *               price:
   *                 type: number
   *                 minimum: 0
   *                 description: Valor do pagamento
   *     responses:
   *       201:
   *         description: Pagamento criado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async handle(req: Request, res: Response) {
    const { orderId, price } = req.body;

    const prisma = new PrismaClient();
    const paymentRepository = new PrismaPaymentRepository(prisma);
    const orderRepository = new PrismaOrderRepository(prisma);
    const useCase = new CreatePayment(paymentRepository, orderRepository);

    const payment = await useCase.execute({
      orderId,
      price,
    });

    await prisma.$disconnect();

    if (payment.isLeft()) {
      return res.status(400).json({ message: payment.value });
    }

    return res.status(201).json(payment.value);
  }
}
