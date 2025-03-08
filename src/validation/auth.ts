import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).max(50).required(),
  username: Joi.string().min(3).max(20).required(),
});
