import express from "express";

import {
  register,
  login,
  logout,
  getMe
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  registerValidator,
  loginValidator
} from "../validators/auth.validator.js";

import protect from "../middleware/auth.middleware.js";


const router = express.Router();



router.post(
  "/register",
  validate(registerValidator),
  register
);



router.post(
  "/login",
  validate(loginValidator),
  login
);



router.post(
  "/logout",
  logout
);



router.get(
  "/me",
  protect,
  getMe
);



export default router;