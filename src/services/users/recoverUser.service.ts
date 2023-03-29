import { client } from "../../database";
import { QueryConfig } from "pg";
import {
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";

const recoverUserService = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const queryString = `
        UPDATE 
            users
        SET
            "active" = true
        WHERE
            id = $1
        RETURNING *;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const userProfile = returnUserSchemaWithoutPassword.parse(
    queryResult.rows[0]
  );

  return userProfile;
};

export default recoverUserService;
