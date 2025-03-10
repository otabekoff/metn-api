import express from "express";
import { login, register } from "../controllers/authentication";

export default (router: express.Router): void => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};

/* TODO: Implement, import and register the following
- login
- logout
- authenticate
- changePassword
- forgotPassword
- resetPassword
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
*/
