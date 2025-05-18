import { BaseEntity } from "./base";

export class User extends BaseEntity {
  public name: string;
  public email: string;

  constructor(
    public props: {
      name: string;
      email: string;
      readonly id: string;
      readonly updatedAt: Date;
      readonly createdAt: Date;
    }
  ) {
    const { name, email, ...rest } = props;

    super({ ...rest });
    this.name = name;
    this.email = email;
  }
}
