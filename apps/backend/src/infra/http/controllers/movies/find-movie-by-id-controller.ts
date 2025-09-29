import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PrismaMovieRepository } from "../../../repositories/prisma-movie-repository";
import { FindMovieById } from "../../../../core/application/use-cases/find-movie-by-id";

export class FindMovieByIdController {
  /**
   * @swagger
   * /movies/{id}:
   *   get:
   *     summary: Busca um filme por ID
   *     tags:
   *       - Filmes
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do filme
   *     responses:
   *       200:
   *         description: Filme encontrado com sucesso
   *       404:
   *         description: Filme não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const prisma = new PrismaClient();
    const repository = new PrismaMovieRepository(prisma);
    const useCase = new FindMovieById(repository);

    const movie = await useCase.execute(id);

    await prisma.$disconnect();

    if (movie.isLeft()) {
      return res.status(404).json({ message: movie.value });
    }

    return res.status(200).json(movie.value);
  }
}
