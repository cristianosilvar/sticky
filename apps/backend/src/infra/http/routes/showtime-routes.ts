import { Router } from "express";

import { CreateShowtimeController } from "../controllers/showtimes/create-showtime-controller";
import { ListAvailableShowtimesController } from "../controllers/showtimes/list-available-showtimes-controller";

const showtimeRoutes = Router();

const createShowtimeController = new CreateShowtimeController();
const listAvailableShowtimesController = new ListAvailableShowtimesController();

showtimeRoutes.post("/", async (req, res) => {
  createShowtimeController.handle(req, res);
  return;
});
showtimeRoutes.get("/available", async (req, res) => {
  listAvailableShowtimesController.handle(req, res);
  return;
});

export { showtimeRoutes };
