import { getQrTokenStatus, getTodayTokenForUser } from "../services/qr.service";
import { Request, Response } from "express";
import { generateQrToken } from "../services/qr.service";
import { scanQrToken } from "../services/qr.service";
import { isUserSubscribedForMonth } from "../services/subscription.service";

export async function createQrToken(req: Request, res: Response) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    // Ensure user is subscribed for current month
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const sub = await isUserSubscribedForMonth(userId, currentMonth);
    if (!sub.subscribed) {
      return res
        .status(403)
        .json({ message: "Please subscribe for this month" });
    }
    const qr = await generateQrToken(userId);
    res.status(201).json(qr);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

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

export async function getQrStatus(req: Request, res: Response) {
  const token = String(req.query.token || "").trim();

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  try {
    const status = await getQrTokenStatus(token);
    res.json(status);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getTodayToken(req: Request, res: Response) {
  const userId = String(req.query.userId || "").trim();

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    // Check subscription first
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const sub = await isUserSubscribedForMonth(userId, currentMonth);
    if (!sub.subscribed) {
      return res.json({ status: "unsubscribed" });
    }
    const today = await getTodayTokenForUser(userId);
    res.json(today);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
