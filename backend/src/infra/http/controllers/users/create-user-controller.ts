import { Request, Response } from "express";

import { PrismaUserRepository } from "../../../repositories/prisma-user-repository";
import { CreateUser } from "../../../../core/application/use-cases/create-user";

export class CreateUserController {
  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags:
   *       - Usuários
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const repository = new PrismaUserRepository();
    const useCase = new CreateUser(repository);

    const user = await useCase.execute({
      name,
      email,
      password,
    });

    if (user.isLeft()) {
      return res.status(400).json({ message: user.value });
    }

    return res.status(201).json(user.value);
  }
}
