import { client } from "../../database";
import { QueryConfig } from "pg";

const softDeleteUserService = async (userId: number): Promise<void> => {
  const queryString = `
        UPDATE 
            users
        SET
            "active" = false
        WHERE
            id = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};

export default softDeleteUserService;
