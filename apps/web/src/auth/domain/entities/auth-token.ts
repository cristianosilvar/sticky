interface AuthToken {
  token: string;
  refreshToken: string;
}

class AuthTokenEntity {
  token: string;
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }
}

export { type AuthToken, AuthTokenEntity };
