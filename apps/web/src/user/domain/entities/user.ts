import { BaseEntity } from "@/shared/domain/base-entity";

interface User {
  name: string;
  email: string;
}

class UserEntity extends BaseEntity {
  name: string;
  email: string;

  constructor(
    id: string,
    createdAt: Date,
    updateAt: Date,
    name: string,
    email: string
  ) {
    super(id, createdAt, updateAt);
    this.name = name;
    this.email = email;
  }
}

export { type User, UserEntity };
