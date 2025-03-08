import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "../helpers";

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing required fields");
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).send("User not found");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).send("Invalid password");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("sessionToken", user.authentication.sessionToken, {
      domain: process.env.COOKIE_DOMAIN || "localhost",
      path: "/",
      // httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send("Missing required fields");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
