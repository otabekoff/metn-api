import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

const MONGO_URL = process.env.MONGO_URL || "your_default_mongo_url";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error: Error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to MongoDB"));
mongoose.connection.on("close", () => console.log("Disconnected from MongoDB"));
mongoose.connection.on("reconnected", () =>
  console.log("Reconnected to MongoDB")
);

app.use("/", router());
