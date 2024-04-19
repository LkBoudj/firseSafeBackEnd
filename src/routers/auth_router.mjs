import express from "express";
import passport from "passport";
const router = express.Router();
import {
  registerValidation,
  loginValidation,
} from "../validation/user/index.mjs";
import validateData from "../middleware/validationMiddleware.mjs";
import { register, login } from "../controllers/user/index.mjs";
router.post(
  "/login",
  validateData(loginValidation),
  passport.authenticate("local"),
  login
);

router.post("/register", validateData(registerValidation), register);

export default router;
