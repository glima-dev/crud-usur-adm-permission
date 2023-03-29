import { QueryConfig } from "pg";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../errors";
import { client } from "../../database";
import { ILoginRequest } from "../../interfaces/login.interfaces";
import { IUserResultWithPassword } from "../../interfaces/users.interfaces";

const createLoginService = async (
  loginData: ILoginRequest
): Promise<string> => {
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
    values: [loginData.email],
  };

  const queryResult: IUserResultWithPassword = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  if (!queryResult.rows[0].active) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
      active: queryResult.rows[0].active,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
