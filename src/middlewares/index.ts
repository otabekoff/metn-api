import express from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user identity found" });
    }

    if (String(id) !== String(currentUserId)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not the owner of this resource" });
    }

    next();
  } catch (error) {
    console.error("Error in isOwner middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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
