import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaMovieRepository } from "../../../repositories/prisma-movie-repository";
import { CreateMovie } from "../../../../core/application/use-cases/create-movie";

export class CreateMovieController {
  /**
   * @swagger
   * /movies:
   *   post:
   *     summary: Cria um novo filme
   *     tags:
   *       - Filmes
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - synopsis
   *               - rating
   *               - durationMinutes
   *             properties:
   *               title:
   *                 type: string
   *                 description: Título do filme
   *               synopsis:
   *                 type: string
   *                 description: Sinopse do filme
   *               rating:
   *                 type: number
   *                 minimum: 0
   *                 maximum: 10
   *                 description: Avaliação do filme (0-10)
   *               durationMinutes:
   *                 type: number
   *                 minimum: 1
   *                 description: Duração em minutos
   *     responses:
   *       201:
   *         description: Filme criado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async handle(req: Request, res: Response) {
    const { title, synopsis, rating, durationMinutes } = req.body;

    const prisma = new PrismaClient();
    const repository = new PrismaMovieRepository(prisma);
    const useCase = new CreateMovie(repository);

    const movie = await useCase.execute({
      title,
      synopsis,
      rating,
      durationMinutes,
    });

    await prisma.$disconnect();

    if (movie.isLeft()) {
      return res.status(400).json({ message: movie.value });
    }

    return res.status(201).json(movie.value);
  }
}
