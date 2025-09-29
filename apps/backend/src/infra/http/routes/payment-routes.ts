import { Router } from "express";

import { CreatePaymentController } from "../controllers/payments/create-payment-controller";

const paymentRoutes = Router();

const createPaymentController = new CreatePaymentController();

paymentRoutes.post("/", async (req, res) => {
  createPaymentController.handle(req, res);
  return;
});

export { paymentRoutes };
