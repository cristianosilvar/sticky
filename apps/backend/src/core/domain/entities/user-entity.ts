import { BaseEntity } from "./base";

export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User extends BaseEntity<UserProps> {
  constructor(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(props, id, createdAt, updatedAt);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }
}
