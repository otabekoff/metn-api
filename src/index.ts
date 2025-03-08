import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const app = express();

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

// Just a simple route to test the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080/");
});
