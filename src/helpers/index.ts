import crypto from "crypto";
import bcrypt from "bcrypt";

const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};


// // NEW CODE
// import bcrypt from "bcrypt";

// // Generate a random salt (32 bytes in hex format)
// export const random = () => crypto.randomBytes(32).toString("hex");

// const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

// export const hashPassword = async (password: string): Promise<string> => {
//   return await bcrypt.hash(password, SALT_ROUNDS);
// };

// export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
//   return await bcrypt.compare(password, hashedPassword);
// };


// OLD CODE
// const SECRET = "OTABEK-REST-API";

// export const random = () => crypto.randomBytes(128).toString("base64");
// export const authentication = (salt: string, password: string) => {
//   const hash = crypto.createHmac("sha256", [salt, password].join("/"));
//   hash.update(SECRET);
//   return hash.digest("hex");
// };
