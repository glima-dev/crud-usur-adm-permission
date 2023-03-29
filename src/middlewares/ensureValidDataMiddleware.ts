import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureValidDataMiddleware =
  (schema: ZodTypeAny) => (req: Request, _: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };

export default ensureValidDataMiddleware;
