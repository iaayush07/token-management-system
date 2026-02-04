import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import validateSignup from "../middlewares/validateSignup";
import validateLogin from "../middlewares/validateLogin";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

export default router;
