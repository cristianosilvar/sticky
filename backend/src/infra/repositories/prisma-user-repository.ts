import { CreateUserInput } from "../../core/application/dto/create-user-dto";
import { User } from "../../core/domain/entities/user-entity";
import { UserRepository } from "../../core/domain/repositories/user-repository";
import { prisma } from "../database/prisma";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({ where: { email } });
    if (!result) return null;

    return new User({ ...result });
  }

  async create(user: CreateUserInput): Promise<User> {
    const created = await prisma.user.create({
      data: { email: user.email, name: user.name, password: user.password },
    });

    return new User({ ...created });
  }
}
