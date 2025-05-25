import { BaseEntity } from "./base";

export class User extends BaseEntity {
  public name: string;
  public email: string;
  public password: string;

  constructor(
    public props: {
      name: string;
      email: string;
      password: string;
      readonly id: string;
      readonly updatedAt: Date;
      readonly createdAt: Date;
    }
  ) {
    const { name, email, password, ...rest } = props;

    super({ ...rest });
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
