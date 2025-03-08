import mongoose from "mongoose";

// USER SCHEMA
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // role: { type: String, required: true },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
    // resetPasswordToken: { type: String },
    // resetPasswordExpires: { type: Date },
    // verifyEmailToken: { type: String },
    // verifyEmailExpires: { type: Date },
    // isVerified: { type: Boolean, default: false },
    // googleId: { type: String },
    // facebookId: { type: String },
    // twitterId: { type: String },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

// READ
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

// CREATE
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

// DELETE
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const deleteUserByEmail = (email: string) =>
  UserModel.findOneAndDelete({ email });

// UPDATE
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
export const updateUserByEmail = (email: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ email }, values);
