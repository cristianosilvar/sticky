import type { AuthTokenEntity } from "@/auth/domain/entities/auth-token";
import type { AuthRepository } from "@/auth/domain/repositories/auth-repository";
import { axiosClient } from "@/shared/infra/api/axios";

export class ApiAuthRepository implements AuthRepository {
  private baseUrl = "/auth";

  login(params: {
    email: string;
    password: string;
  }): Promise<AuthTokenEntity | null> {
    return axiosClient.post(`${this.baseUrl}/login`, params);
  }

  register(params: {
    email: string;
    name: string;
    password: string;
  }): Promise<void> {
    return axiosClient.post(`${this.baseUrl}/register`, params);
  }
}
