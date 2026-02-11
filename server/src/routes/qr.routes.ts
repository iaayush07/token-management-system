import { Router } from "express";
import { createQrToken, scanQr } from "../controllers/qr.controller";

const router = Router();

router.post("/generate", createQrToken);
router.post("/scan", scanQr);

export default router;
