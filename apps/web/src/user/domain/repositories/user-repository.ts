import type { User } from "../entities/user";

interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

export { type UserRepository };
