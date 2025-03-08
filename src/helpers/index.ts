import crypto from "crypto";

const SECRET = "OTABEK-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  const hash = crypto.createHmac("sha256", [salt, password].join("/"));
  hash.update(SECRET);
  return hash.digest("hex");
};
