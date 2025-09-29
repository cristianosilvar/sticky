export interface AuthenticateUserInput {
  email: string;
  password: string;
}

export interface AuthenticateUserOutput {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
