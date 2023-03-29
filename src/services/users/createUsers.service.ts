import format from "pg-format";
import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const queryString = format(
    `
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING *;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;
