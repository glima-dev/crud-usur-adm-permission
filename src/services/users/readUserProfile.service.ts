import {
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schemas";
import { QueryConfig } from "pg";

const readUserProfileService = async (
  userId: number
): Promise<IUserWithoutPassword> => {
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
    values: [userId],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const userProfile = returnUserSchemaWithoutPassword.parse(
    queryResult.rows[0]
  );

  return userProfile;
};

export default readUserProfileService;
