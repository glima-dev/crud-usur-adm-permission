import { parse } from "dotenv";
import { Request, Response } from "express";
import { IUpdateUSer, IUserRequest } from "../interfaces/users.interfaces";
import createUsersService from "../services/users/createUsers.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import readUserProfileService from "../services/users/readUserProfile.service";
import recoverUserService from "../services/users/recoverUser.service";
import softDeleteUserService from "../services/users/softDeleteUsers.service";
import updateUserService from "../services/users/updateUsers.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return res.json(users);
};

const readUserProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.user.id;

  const user = await readUserProfileService(userId);

  return res.json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const payload: IUpdateUSer = req.body;

  const user = await updateUserService(payload, userId);

  return res.json(user);
};

const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await softDeleteUserService(userId);

  return res.status(204).send();
};

const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const user = await recoverUserService(userId);

  return res.json(user);
};

export {
  createUsersController,
  listAllUsersController,
  readUserProfileController,
  updateUserController,
  softDeleteUserController,
  recoverUserController,
};
