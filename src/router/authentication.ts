import express from "express";
import { register } from "../controllers/authentication";

const router = express.Router();

export default (router: express.Router) => {
  router.post("/auth/register", register);
};

// import { register } from '../controllers/authentication';
// import { login } from '../controllers/authentication';
// import { logout } from '../controllers/authentication';
// import { authenticate } from '../middleware/authentication';
// import { changePassword } from '../controllers/authentication';
// import { forgotPassword } from '../controllers/authentication';
// import { resetPassword } from '../controllers/authentication';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/logout', authenticate, logout);
// router.post('/change-password', authenticate, changePassword);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);
