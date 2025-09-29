import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaShowtimeRepository } from "../../../repositories/prisma-showtime-repository";
import { PrismaMovieRepository } from "../../../repositories/prisma-movie-repository";
import { CreateShowtime } from "../../../../core/application/use-cases/create-showtime";

export class CreateShowtimeController {
  /**
   * @swagger
   * /showtimes:
   *   post:
   *     summary: Cria uma nova sessão
   *     tags:
   *       - Sessões
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - movieId
   *               - date
   *               - startAt
   *               - status
   *               - basePrice
   *             properties:
   *               movieId:
   *                 type: string
   *                 description: ID do filme
   *               date:
   *                 type: string
   *                 format: date-time
   *                 description: Data da sessão
   *               startAt:
   *                 type: string
   *                 format: date-time
   *                 description: Horário de início
   *               status:
   *                 type: string
   *                 enum: [SCHEDULED, ONGOING, COMPLETED, CANCELLED]
   *                 description: Status da sessão
   *               basePrice:
   *                 type: number
   *                 minimum: 0
   *                 description: Preço base do ingresso
   *     responses:
   *       201:
   *         description: Sessão criada com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async handle(req: Request, res: Response) {
    const { movieId, date, startAt, status, basePrice } = req.body;

    const prisma = new PrismaClient();
    const showtimeRepository = new PrismaShowtimeRepository(prisma);
    const movieRepository = new PrismaMovieRepository(prisma);
    const useCase = new CreateShowtime(showtimeRepository, movieRepository);

    const showtime = await useCase.execute({
      movieId,
      date: new Date(date),
      startAt: new Date(startAt),
      status,
      basePrice,
    });

    await prisma.$disconnect();

    if (showtime.isLeft()) {
      return res.status(400).json({ message: showtime.value });
    }

    return res.status(201).json(showtime.value);
  }
}
