import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureAdminPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const isAdmin = req.user.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};

export default ensureAdminPermissionMiddleware;
