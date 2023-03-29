import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const ensureRegisteredEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = req.body.email;

  if (req.method === "PATCH" && !userEmail) {
    return next();
  }

  const queryString: string = `
      SELECT
          *
      FROM
          users
      WHERE
      email = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userEmail],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (!!queryResult.rowCount) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export default ensureRegisteredEmailMiddleware;
