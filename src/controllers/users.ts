import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const getUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const user = await getUserById(req.params.id);
    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.status(400).send("Missing required fields");
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.json(deleteUser).status(200).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
