import type { AuthRepository } from "../repositories/auth-repository";

interface RegisterUserParams {
  email: string;
  name: string;
  password: string;
}

class RegisterUserUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(params: RegisterUserParams): Promise<void> {
    return await this.authRepository.register(params);
  }
}

export { RegisterUserUseCase };
