import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "../docs/swagger";

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
}
