import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import router from "./router";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    // origin: 'http://localhost:3000'
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:8080/");
});

const MONGO_URL =
  "mongodb+srv://bekky:fv4zMnhKXGmEbV5J@cluster0.poqkapp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = Promise;
mongoose
  .connect(
    MONGO_URL
    // , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

mongoose.connection.on("error", (error: Error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to MongoDB"));
mongoose.connection.on("close", () => console.log("Disconnected from MongoDB"));
mongoose.connection.on("reconnected", () =>
  console.log("Reconnected to MongoDB")
);

app.use("/", router);