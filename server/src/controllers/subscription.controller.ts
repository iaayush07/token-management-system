import { Request, Response } from "express";
import {
  getSubscriptions,
  isEnrollmentOpen,
  upsertSubscription,
} from "../services/subscription.service";

export async function listSubscriptions(req: Request, res: Response) {
  try {
    const { month } = req.query;

    if (!month) {
      return res
        .status(400)
        .json({ message: "Month is required (YYYY-MM-01)" });
    }

    const subscriptions = await getSubscriptions(month as string);
    res.status(200).json(subscriptions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// export async function saveSubscription(req: Request, res: Response) {
//   const { userId, planName, status, startDate, endDate } = req.body;

//   if (!userId || !startDate || !endDate) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   await upsertSubscription(userId, planName, status, startDate, endDate);
//   res.json({ message: "Subscription saved" });
// }
export async function saveSubscription(req: Request, res: Response) {
  try {
    const { userId, planName, status, startDate, endDate } = req.body;

    if (!userId || !startDate) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Extract month from startDate (YYYY-MM)
    const month = new Date(startDate).toISOString().slice(0, 7);

    // 🔹 Check enrollment
    const enrollmentOpen = await isEnrollmentOpen(month);

    if (!enrollmentOpen) {
      return res.status(400).json({
        message: "Enrollment is closed for this month",
      });
    }

    await upsertSubscription(
      userId,
      planName,
      status,
      startDate,
      endDate || null,
    );

    res.json({ message: "Subscription saved successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
