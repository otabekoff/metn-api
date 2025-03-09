import mongoose from "mongoose";

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

export const UserModel = mongoose.model("User", UserSchema);

// CREATE
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
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
