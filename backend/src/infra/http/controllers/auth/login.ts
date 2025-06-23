import { Request, Response } from "express";

import { PrismaUserRepository } from "../../../repositories/prisma-user-repository";
import { AuthenticateUserUseCase } from "../../../../core/application/use-cases/auth/authenticate-user";

export class LoginController {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Autentica um usuário e retorna um token JWT
   *     tags:
   *       - Autenticação
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       200:
   *         description: Autenticação bem-sucedida
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *       400:
   *         description: Credenciais inválidas
   */
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepository = new PrismaUserRepository();
    const authenticateUser = new AuthenticateUserUseCase(userRepository);

    const result = await authenticateUser.execute({ email, password });

    if (result.isLeft()) {
      return res.status(400).json({ message: result.value });
    }

    return res.status(200).json(result.value);
  }
}
