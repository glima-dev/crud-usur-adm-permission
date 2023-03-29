import { AppError } from "../../errors";
import { client } from "../../database";
import {
  IUpdateUSer,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import format from "pg-format";
import { QueryConfig } from "pg";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: IUpdateUSer,
  userId: number
): Promise<IUserWithoutPassword> => {
  if (!Object.keys(userData).length) {
    throw new AppError("Provide at least one updatable value", 400);
  }
  const queryString = format(
    `
        UPDATE 
            users 
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
      `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const updatedUser = returnUserSchemaWithoutPassword.parse(
    queryResult.rows[0]
  );

  return updatedUser;
};

export default updateUserService;
