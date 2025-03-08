import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/users";
import { hashPassword } from "../helpers";
import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).max(50).required(),
  username: Joi.string().min(3).max(20).required(),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body using Joi
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { email, password, username } = value;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await createUser({
      email,
      username,
      authentication: { password: hashedPassword },
    });

    // Send success response
    res
      .status(201)
      .json({ id: user._id, email: user.email, username: user.username });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
