import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/users";
import { hashPassword } from "../helpers";
import { registerSchema } from "../validation/auth";

export const register = async (req: Request, res: Response) => {
  try {
    // Validate request body using Joi
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, username } = value;

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user = await createUser({
      email,
      username,
      authentication: { password: hashedPassword },
    });

    // Return response (excluding authentication details)
    return res
      .status(201)
      .json({ id: user._id, email: user.email, username: user.username });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
