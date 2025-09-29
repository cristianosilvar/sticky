import { sign, SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export class JwtService {
  static sign(userId: string): string {
    const secret = env.JWT_SECRET;
    const options: SignOptions = {
      subject: userId,
      expiresIn: env.JWT_EXPIRES_IN as number,
    };

    return sign({}, secret, options);
  }
}
