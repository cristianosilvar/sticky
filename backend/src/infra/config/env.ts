import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("8080"),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.union([z.string(), z.number()]),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Erro nas variáveis de ambiente", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
