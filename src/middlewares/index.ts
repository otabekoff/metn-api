import express from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const sessionToken = req.cookies["sessionToken"];
    if (!sessionToken) {
      return res.status(401).send("Unauthorized");
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(401).send("Unauthorized");
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
