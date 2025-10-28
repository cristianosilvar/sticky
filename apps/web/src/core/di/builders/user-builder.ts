import { AxiosHttpClient } from "@/infrastructure/http/axios-http-client";
import { ApiUserRepository } from "@/user/infrastructure/adapters/api-user-repository";

export function buildUserContext() {
  const httpClient = new AxiosHttpClient();
  const userRepository = new ApiUserRepository(httpClient);

  return {
    userRepository,
  };
}
