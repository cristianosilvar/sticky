import { env } from "../../../infra/config/env";
import { left, right } from "../../../shared/utils/either";
import { UserRepository } from "../../domain/repositories/user-repository";
import { AuthenticateUserInput } from "../dto/authenticate-user-dto";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

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

    const payload = { sub: user.id };
    const secret = env.JWT_SECRET;
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as number,
    };

    const token = jwt.sign(payload, secret, options);

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
