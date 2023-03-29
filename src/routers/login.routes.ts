import { Router } from "express";
import ensureValidDataMiddleware from "../middlewares/ensureValidDataMiddleware";
import { createLoginSchema } from "../schemas/login.schemas";
import { createLoginController } from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureValidDataMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
