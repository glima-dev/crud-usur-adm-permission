import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idTargetUser = parseInt(req.params.id);

  const queryString: string = `
      SELECT
          *
      FROM
          users
      WHERE
          id = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idTargetUser],
  };

  const queryResultUserExists: QueryResult = await client.query(queryConfig);

  if (!queryResultUserExists.rowCount) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default ensureUserExistsMiddleware;
