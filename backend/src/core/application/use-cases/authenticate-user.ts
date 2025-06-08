import bcrypt from "bcryptjs";

import { left, right } from "../../../shared/utils/either";
import { UserRepository } from "../../domain/repositories/user-repository";
import { AuthenticateUserInput } from "../dto/authenticate-user-dto";
import { JwtService } from "../../../infra/auth/jwt-service";

export class AuthenticaUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(params: AuthenticateUserInput) {
    const user = await this.userRepository.findByEmail(params.email);

    if (!user) return left("Invalid credentials");

    const passwordMatch = await bcrypt.compare(
      params.password,
      user?.email ?? ""
    );

    if (!passwordMatch) return left("Invalid credentials");

    const token = JwtService.sign(user.id);

    return right({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}
