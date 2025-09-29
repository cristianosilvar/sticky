import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaMovieRepository } from "../../../repositories/prisma-movie-repository";
import { ListMovies } from "../../../../core/application/use-cases/list-movies";

export class ListMoviesController {
  /**
   * @swagger
   * /movies:
   *   get:
   *     summary: Lista todos os filmes
   *     tags:
   *       - Filmes
   *     responses:
   *       200:
   *         description: Lista de filmes retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   title:
   *                     type: string
   *                   synopsis:
   *                     type: string
   *                   rating:
   *                     type: number
   *                   durationMinutes:
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
    const repository = new PrismaMovieRepository(prisma);
    const useCase = new ListMovies(repository);

    const movies = await useCase.execute();

    await prisma.$disconnect();

    if (movies.isLeft()) {
      return res.status(500).json({ message: movies.value });
    }

    return res.status(200).json(movies.value);
  }
}
