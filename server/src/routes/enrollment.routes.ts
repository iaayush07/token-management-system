import { Router } from "express";
import {
  updateEnrollment,
  fetchEnrollment,
} from "../controllers/enrollment.controller";

const router = Router();

// Admin toggles enrollment
router.post("/toggle", updateEnrollment);

// Get enrollment status
router.get("", fetchEnrollment);

export default router;
