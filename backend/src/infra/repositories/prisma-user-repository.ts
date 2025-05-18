import { User } from "@/core/domain/entities/user-entity";
import { prisma } from "../database/prisma";
import { UserRepository } from "@/core/domain/repositories/user-repository";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({ where: { email } });
    if (!result) return null;

    return new User({ ...result });
  }

  async save(user: { email: string; name: string }): Promise<void> {
    await prisma.user.create({ data: { email: user.email, name: user.name } });
  }
}
