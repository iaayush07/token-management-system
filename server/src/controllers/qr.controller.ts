import { Request, Response } from "express";
import { generateQrToken } from "../services/qr.service";

export async function createQrToken(req: Request, res: Response) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const qr = await generateQrToken(userId);
    res.status(201).json(qr);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

import { scanQrToken } from "../services/qr.service";

export async function scanQr(req: Request, res: Response) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  try {
    const result = await scanQrToken(token);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
