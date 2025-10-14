import type { AuthTokenEntity } from "../entities/auth-token";

interface AuthRepository {
  login(params: {
    email: string;
    password: string;
  }): Promise<AuthTokenEntity | null>;
  register(params: {
    email: string;
    name: string;
    password: string;
  }): Promise<void>;
}

export { type AuthRepository };
