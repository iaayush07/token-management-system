import { Request, Response } from "express";
import {
  toggleEnrollment,
  getEnrollmentStatus,
} from "../services/enrollment.service";

export async function updateEnrollment(req: Request, res: Response) {
  const { year, month, isOpen } = req.body;

  if (!year || !month) {
    return res.status(400).json({
      message: "Year and month are required",
    });
  }

  try {
    const result = await toggleEnrollment(year, month, isOpen);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export async function fetchEnrollment(req: Request, res: Response) {
  const year = Number(req.query.year);
  const month = Number(req.query.month);

  if (!year || !month) {
    return res.status(400).json({
      message: "Year and month query params required",
    });
  }

  try {
    const result = await getEnrollmentStatus(year, month);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
