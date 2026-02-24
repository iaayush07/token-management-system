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

// Health endpoint for enrollment routes
router.get("/health", (_req, res) => {
  res.json({ status: "ok", route: "enrollment" });
});

export default router;
