import pool from "../config/db";
import { randomUUID } from "crypto";

export async function generateQrToken(userId: string) {
  // 1️⃣ Check if token already exists for today
  const existing = await pool.query(
    `
    SELECT token, expires_at
    FROM qr_tokens
    WHERE userid = $1
      AND token_date = CURRENT_DATE
      AND used = false
      AND expires_at > NOW()
    LIMIT 1
    `,
    [userId],
  );

  if (existing.rows.length > 0) {
    // ✅ Return same token on reload
    return existing.rows[0];
  }

  // 2️⃣ Otherwise generate new token
  const token = randomUUID();

  const result = await pool.query(
    `
    INSERT INTO qr_tokens (
      userid,
      token,
      token_date,
      expires_at
    )
    VALUES (
      $1,
      $2,
      CURRENT_DATE,
      NOW() + INTERVAL '10 minutes'
    )
    RETURNING token, expires_at
    `,
    [userId, token],
  );

  return result.rows[0];
}

export async function scanQrToken(token: string) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `
      SELECT id, userid, used, expires_at
      FROM qr_tokens
      WHERE token = $1
      FOR UPDATE
      `,
      [token],
    );

    if (result.rows.length === 0) {
      throw new Error("Invalid QR token");
    }

    const qr = result.rows[0];

    if (qr.used) {
      throw new Error("QR token already used");
    }

    if (new Date(qr.expires_at) < new Date()) {
      throw new Error("QR token expired");
    }

    await client.query(
      `
      UPDATE qr_tokens
      SET used = true,
          used_at = NOW()
      WHERE id = $1
      `,
      [qr.id],
    );

    await client.query("COMMIT");

    return {
      message: "QR token scanned successfully",
      userId: qr.userid,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
