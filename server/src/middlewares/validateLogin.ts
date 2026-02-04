import { Request, Response, NextFunction } from "express";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body || {};

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be at least 8 characters" });
  }

  // Normalize inputs for downstream handlers
  req.body.email = email.trim().toLowerCase();

  return next();
}
