import { Router } from "express";

import { CreateTicketController } from "../controllers/tickets/create-ticket-controller";

const ticketRoutes = Router();

const createTicketController = new CreateTicketController();

ticketRoutes.post("/", async (req, res) => {
  createTicketController.handle(req, res);
  return;
});

export { ticketRoutes };
