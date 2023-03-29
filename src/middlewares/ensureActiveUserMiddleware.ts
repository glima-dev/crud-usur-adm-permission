import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const ensureActiveUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idTargetUser = parseInt(req.params.id);

  const queryString: string = `
      SELECT
          "active"
      FROM
          users
      WHERE
      id = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idTargetUser],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (req.method === "DELETE" && !queryResult.rows[0].active) {
    throw new AppError("User already inactive", 400);
  }

  if (req.method === "PUT" && queryResult.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  return next();
};

export default ensureActiveUserMiddleware;
