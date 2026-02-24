import { Router } from "express";
import {
  createQrToken,
  scanQr,
  getQrStatus,
  getTodayToken,
} from "../controllers/qr.controller";

const router = Router();

router.get("/status", getQrStatus);
router.get("/today", getTodayToken);
router.post("/generate", createQrToken);
router.post("/scan", scanQr);

export default router;
