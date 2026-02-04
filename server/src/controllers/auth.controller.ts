import { Request, Response } from "express";
import { createUser, loginUser } from "../services/auth.service";

export async function signup(req: Request, res: Response) {
  const { full_name, email, password, role } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      message: "full_name, email and password are required",
    });
  }

  try {
    const user = await createUser(
      full_name,
      email,
      password,
      role || "EMPLOYEE",
    );

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
