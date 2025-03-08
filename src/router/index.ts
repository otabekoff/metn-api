import express from "express";
import authentication from "./authentication";

const router = express.Router();

authentication(router);

export default router;
