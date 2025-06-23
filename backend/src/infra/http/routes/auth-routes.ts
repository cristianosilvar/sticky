import { Router } from "express";

import { LoginController } from "../controllers/auth/login";

const authRoutes = Router();
const loginController = new LoginController();

authRoutes.post("/login", async (req, res) => {
  loginController.handle(req, res);
  return;
});

export { authRoutes };
