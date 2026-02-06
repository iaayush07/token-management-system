import { Request, Response, NextFunction } from "express";
import pool from "../config/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default async function validateSignup(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { fullName, email, password, role } = req.body || {};

  if (typeof fullName !== "string" || fullName.trim().length < 2) {
    return res
      .status(400)
      .json({ message: "fullName must be at least 2 characters" });
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be at least 8 characters" });
  }

  if (role !== undefined) {
    if (typeof role !== "string") {
      return res
        .status(400)
        .json({ message: "role must be a string if provided" });
    }
    const normalizedRole = role.toUpperCase();
    if (!["EMPLOYEE", "ADMIN"].includes(normalizedRole)) {
      return res
        .status(400)
        .json({ message: "role must be either EMPLOYEE or ADMIN" });
    }
    req.body.role = normalizedRole;
  }

  req.body.fullName = fullName.trim();
  req.body.email = email.trim().toLowerCase();

  try {
    const existing = await pool.query(
      "SELECT 1 FROM users WHERE email = $1 LIMIT 1",
      [req.body.email],
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }
  } catch (err) {
    return next(err);
  }

  return next();
}
