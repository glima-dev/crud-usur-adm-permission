import {
  IAllUsersReturn,
  IUserResult,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { allUsersSchema } from "../../schemas/users.schemas";

const listAllUsersService = async (): Promise<IAllUsersReturn> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;    
        `;

  const queryResult: IUserResult = await client.query(queryString);

  const listUsers = allUsersSchema.parse(queryResult.rows);

  return listUsers;
};

export default listAllUsersService;
