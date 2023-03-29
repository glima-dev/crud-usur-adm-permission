import { Router } from "express";
import ensureValidDataMiddleware from "../middlewares/ensureValidDataMiddleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import {
  createUsersController,
  listAllUsersController,
  readUserProfileController,
  recoverUserController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureValidTokenMiddleware from "../middlewares/ensureValidTokenMiddleware";
import ensureOnlyAdminPermissionMiddleware from "../middlewares/ensureOnlyAdminPermissionMiddleware";
import ensureRegisteredEmailMiddleware from "../middlewares/ensureRegisteredEmailMiddleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExistsMiddleware";
import ensureAdminPermissionEditUsersMiddleware from "../middlewares/ensureAdminPermissionEditUsersMiddleware";
import ensureActiveUserMiddleware from "../middlewares/ensureActiveUserMiddleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureValidDataMiddleware(createUserSchema),
  ensureRegisteredEmailMiddleware,
  createUsersController
);
userRoutes.get(
  "",
  ensureValidTokenMiddleware,
  ensureOnlyAdminPermissionMiddleware,
  listAllUsersController
);

userRoutes.get(
  "/profile",
  ensureValidTokenMiddleware,
  readUserProfileController
);

userRoutes.patch(
  "/:id",
  ensureValidTokenMiddleware,
  ensureUserExistsMiddleware,
  ensureAdminPermissionEditUsersMiddleware,
  ensureValidDataMiddleware(updateUserSchema),
  ensureRegisteredEmailMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureValidTokenMiddleware,
  ensureUserExistsMiddleware,
  ensureAdminPermissionEditUsersMiddleware,
  ensureActiveUserMiddleware,
  softDeleteUserController
);

userRoutes.put(
  "/:id/recover",
  ensureValidTokenMiddleware,
  ensureUserExistsMiddleware,
  ensureOnlyAdminPermissionMiddleware,
  ensureActiveUserMiddleware,
  recoverUserController
);

export default userRoutes;
