import { HttpMethod, type IHttpClient } from "@/shared/core/http-client";
import type { UserEntity } from "@/user/domain/entities/user";
import type { UserRepository } from "@/user/domain/repositories/user-repository";

interface UserApiDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const toDomainUser = (dto: UserApiDto): UserEntity => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

const toApiDto = (user: UserEntity): UserApiDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export class ApiUserRepository implements UserRepository {
  private http: IHttpClient;
  private baseUrl = "/users";

  constructor(http: IHttpClient) {
    this.http = http;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const response = await this.http.sendRequest<UserApiDto>({
      endpoint: `${this.baseUrl}/${id}`,
      method: HttpMethod.GET,
    });
    return toDomainUser(response);
  }

  async save(user: UserEntity): Promise<void> {
    const userDto = toApiDto(user);
    return await this.http.sendRequest<void>({
      endpoint: this.baseUrl,
      method: HttpMethod.POST,
      body: userDto,
    });
  }
}
