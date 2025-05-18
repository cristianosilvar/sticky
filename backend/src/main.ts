import express from "express";
import "dotenv/config";
import { logger } from "./infra/config/logger";
import { env } from "@/infra/config/env";

const app = express();
app.use(express.json());

const port = env.PORT;
app.listen(port, () => logger.info(`Server running on port ${port}`));
