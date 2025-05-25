import { CreateUserInput } from "../../application/dto/create-user-dto";
import { User } from "../entities/user-entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserInput): Promise<User>;
}
