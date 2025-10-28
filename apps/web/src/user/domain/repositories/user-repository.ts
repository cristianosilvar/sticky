import type { UserEntity } from "../entities/user";

interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
}

export { type UserRepository };
