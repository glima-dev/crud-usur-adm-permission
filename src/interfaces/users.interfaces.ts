import { QueryResult } from "pg";
import { z } from "zod";
import {
  allUsersSchema,
  createUserSchema,
  returnUserSchema,
  updateUserSchema,
} from "../schemas/users.schemas";

type IUserRequest = z.infer<typeof createUserSchema>;
type IUser = z.infer<typeof returnUserSchema>;

type IUserWithoutPassword = Omit<IUser, "password">;
type IUserResult = QueryResult<IUserWithoutPassword>;
type IUserResultWithPassword = QueryResult<IUser>;
type IAllUsersReturn = z.infer<typeof allUsersSchema>;

type IUpdateUSer = z.infer<typeof updateUserSchema>;

export {
  IUserRequest,
  IUser,
  IUserWithoutPassword,
  IUserResult,
  IUserResultWithPassword,
  IAllUsersReturn,
  IUpdateUSer,
};
