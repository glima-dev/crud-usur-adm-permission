import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureAdminPermissionEditUsersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.admin;
  const idLoggedUser = req.user.id;
  const idTargetUser = parseInt(req.params.id);

  if (idLoggedUser !== idTargetUser) {
    if (!isAdmin) {
      throw new AppError("Insufficient Permission", 403);
    }
  }

  return next();
};

export default ensureAdminPermissionEditUsersMiddleware;
