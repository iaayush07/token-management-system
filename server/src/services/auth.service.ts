import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(
  full_name: string,
  email: string,
  password: string,
  role: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userResult = await client.query(
      `INSERT INTO users ("fullName", email, password)
       VALUES ($1, $2, $3)
       RETURNING id, "fullName", email`,
      [full_name, email, hashedPassword],
    );

    const user = userResult.rows[0];

    const roleResult = await client.query(
      `SELECT id FROM roles WHERE name = $1`,
      [role.toUpperCase()],
    );

    if (!roleResult.rows[0]) {
      throw new Error(`Role "${role}" does not exist`);
    }

    const roleId = roleResult.rows[0].id;

    await client.query(
      `INSERT INTO user_roles (user_id, role_id)
       VALUES ($1, $2)`,
      [user.id, roleId],
    );

    await client.query("COMMIT");

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: role.toUpperCase(),
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function loginUser(email: string, password: string) {
  const client = await pool.connect();
  try {
    // 1️⃣ Find user by email
    const userResult = await client.query(
      `SELECT u.id, u."fullName" as full_name, u.email, u.password, r.name as role
       FROM users u
       JOIN user_roles ur ON u.id = ur.user_id
       JOIN roles r ON ur.role_id = r.id
       WHERE u.email = $1`,
      [email],
    );

    if (userResult.rows.length === 0) {
      throw new Error("Invalid credentials");
    }

    const user = userResult.rows[0];

    // 2️⃣ Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "supersecret", // use env in production
      { expiresIn: "8h" },
    );

    return { token };
  } finally {
    client.release();
  }
}
