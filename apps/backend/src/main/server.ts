import express from "express";
import "dotenv/config";
import cors from "cors";

import { logger } from "../infra/config/logger";
import { env } from "../infra/config/env";
import { setupSwagger } from "./config/swagger";
import { usersRoutes } from "../infra/http/routes/user-routes";
import { authRoutes } from "../infra/http/routes/auth-routes";
import { movieRoutes } from "../infra/http/routes/movie-routes";
import { showtimeRoutes } from "../infra/http/routes/showtime-routes";
import { orderRoutes } from "../infra/http/routes/order-routes";
import { paymentRoutes } from "../infra/http/routes/payment-routes";
import { ticketRoutes } from "../infra/http/routes/ticket-routes";

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/showtimes", showtimeRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/tickets", ticketRoutes);

setupSwagger(app);

const port = env.PORT;
app.listen(port, () => logger.info(`Server running on port ${port}`));
