import { left, right } from "../../../shared/utils/either";
import { CreateUserInput } from "../dto/create-user-dto";
import { UserRepository } from "./../../domain/repositories/user-repository";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user-entity";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(params: CreateUserInput) {
    const userAlreadyExists = await this.userRepository.findByEmail(
      params.email
    );

    if (userAlreadyExists) return left("Email already in use");

    const hashedPassword = await bcrypt.hash(params.password, 8);
    const createdUser = await this.userRepository.create({
      name: params.name,
      email: params.email,
      password: hashedPassword,
    });

    return right({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    });
  }
}
