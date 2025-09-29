import { Router } from "express";

import { CreateOrderController } from "../controllers/orders/create-order-controller";
import { FindOrdersByUserController } from "../controllers/orders/find-orders-by-user-controller";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const findOrdersByUserController = new FindOrdersByUserController();

orderRoutes.post("/", async (req, res) => {
  createOrderController.handle(req, res);
  return;
});

orderRoutes.get("/user/:userId", async (req, res) => {
  findOrdersByUserController.handle(req, res);
  return;
});

export { orderRoutes };
