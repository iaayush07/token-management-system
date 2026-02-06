import { Request, Response } from "express";
import { createUser, loginUser } from "../services/auth.service";
import { AuthUser } from "../middlewares/auth";
import pool from "../config/db";

export async function signup(req: Request, res: Response) {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "fullName, email and password are required",
    });
  }

  try {
    const user = await createUser(
      fullName,
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

export async function me(req: Request, res: Response) {
  const user = req.user as AuthUser | undefined;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Normalize full name field
  const fullName = user.full_name ?? user.fullName ?? "";

  const role = (user.role || "EMPLOYEE").toUpperCase();
  // Load permissions from role_permissions table
  let permissions: string[] = [];
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT DISTINCT
  p.name
FROM users u
JOIN user_roles ur ON ur.user_id = u.id
JOIN role_permissions rp ON rp.role_id = ur.role_id
JOIN permissions p ON p.id = rp.permission_id
WHERE u.id = $1;
`,
      [user.id],
    );
    permissions = result.rows.map((r: any) => r.name);
    console.log(result);
  } catch (e: any) {
    // Fallback: no permissions found or table missing
    permissions = [];
  } finally {
    client.release();
  }

  return res.json({
    user: {
      id: user.id,
      fullName,
      email: user.email,
      role,
    },
    permissions,
  });
}
