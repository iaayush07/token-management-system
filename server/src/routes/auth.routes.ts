import { Router } from "express";
import { login, signup, me } from "../controllers/auth.controller";
import validateSignup from "../middlewares/validateSignup";
import validateLogin from "../middlewares/validateLogin";
import { verifyJWT } from "../middlewares/auth";

const router = Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/me", verifyJWT, me);

export default router;
