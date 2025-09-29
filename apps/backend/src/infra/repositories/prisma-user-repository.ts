import { PrismaClient } from "@prisma/client";

import { CreateUserInput } from "../../core/application/dto/create-user-dto";
import { User } from "../../core/domain/entities/user-entity";
import { UserRepository } from "../../core/domain/repositories/user-repository";

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({ where: { id } });
    if (!result) return null;

    return new User({ ...result });
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findUnique({ where: { email } });
    if (!result) return null;

    return new User({ ...result });
  }

  async create(user: CreateUserInput): Promise<User> {
    const created = await this.prisma.user.create({
      data: { email: user.email, name: user.name, password: user.password },
    });

    return new User({ ...created });
  }
}
