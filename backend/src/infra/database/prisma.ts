import { PrismaClient } from "@prisma/client";
import { env } from "@/infra/config/env";
import { logger } from "@/infra/config/logger";

const prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (env.NODE_ENV === "development") {
  prisma.$use(async (params, next) => {
    const start = Date.now();
    const result = await next(params);
    const duration = Date.now() - start;
    logger.info(`[Prisma] ${params.model}.${params.action} - ${duration}ms`);
    return result;
  });
}

export { prisma };
