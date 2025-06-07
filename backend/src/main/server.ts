import express from "express";
import "dotenv/config";
import cors from "cors";

import { logger } from "../infra/config/logger";
import { env } from "../infra/config/env";
import { setupSwagger } from "./config/swagger";
import { usersRoutes } from "../infra/http/routes/user-routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRoutes);

setupSwagger(app);

const port = env.PORT;
app.listen(port, () => logger.info(`Server running on port ${port}`));
