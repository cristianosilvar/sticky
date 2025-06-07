import { Router } from "express";

import { CreateUserController } from "../controllers/users/create-user-controller";

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post("/users", async (req, res) => {
  createUserController.handle(req, res);
  return;
});

export { usersRoutes };
