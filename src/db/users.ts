import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

// USER SCHEMA
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

const userValidationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  authentication: Joi.object({
    password: Joi.string().min(6).required(),
    salt: Joi.string(),
    sessionToken: Joi.string(),
  }).required(),
});

export const UserModel = mongoose.model("User", UserSchema);

// CREATE
export const createUser = async (values: Record<string, any>) => {
  const { error } = userValidationSchema.validate(values);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(values.authentication.password, salt);

  values.authentication.salt = salt;
  values.authentication.password = hashedPassword;

  return new UserModel(values).save().then((user) => user.toObject());
};

// READ
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

// UPDATE
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

// DELETE
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
