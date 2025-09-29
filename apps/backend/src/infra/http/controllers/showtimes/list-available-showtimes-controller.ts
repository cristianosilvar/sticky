import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaShowtimeRepository } from "../../../repositories/prisma-showtime-repository";
import { ListAvailableShowtimes } from "../../../../core/application/use-cases/list-available-showtimes";

export class ListAvailableShowtimesController {
  /**
   * @swagger
   * /showtimes/available:
   *   get:
   *     summary: Lista todas as sessões disponíveis
   *     tags:
   *       - Sessões
   *     responses:
   *       200:
   *         description: Lista de sessões disponíveis retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   date:
   *                     type: string
   *                     format: date-time
   *                   movieId:
   *                     type: string
   *                   startAt:
   *                     type: string
   *                     format: date-time
   *                   status:
   *                     type: string
   *                   basePrice:
   *                     type: number
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *       500:
   *         description: Erro interno do servidor
   */
  async handle(_: Request, res: Response) {
    const prisma = new PrismaClient();
    const repository = new PrismaShowtimeRepository(prisma);
    const useCase = new ListAvailableShowtimes(repository);

    const showtimes = await useCase.execute();

    await prisma.$disconnect();

    if (showtimes.isLeft()) {
      return res.status(500).json({ message: showtimes.value });
    }

    return res.status(200).json(showtimes.value);
  }
}
