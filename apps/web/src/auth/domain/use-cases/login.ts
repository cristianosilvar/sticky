import type { AuthTokenEntity } from "../entities/auth-token";
import type { AuthRepository } from "../repositories/auth-repository";

interface LoginParams {
  email: string;
  password: string;
}

class LoginUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(params: LoginParams): Promise<AuthTokenEntity | null> {
    return await this.authRepository.login(params);
  }
}

export { LoginUseCase };
