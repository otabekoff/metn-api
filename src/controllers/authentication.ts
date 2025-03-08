import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import { getUserByEmail, createUser } from "../db/users";

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.authentication.password);

    if (!isPasswordValid) {
      return res.status(403).send("Invalid password");
    }

    const salt = await bcrypt.genSalt(10);
    user.authentication.sessionToken = await bcrypt.hash(user._id.toString(), salt);

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
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      username: Joi.string().min(3).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password, username } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
