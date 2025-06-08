import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { env } from "../../config/env";

interface JwtPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
