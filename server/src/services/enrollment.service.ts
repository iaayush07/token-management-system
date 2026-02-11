import pool from "../config/db";

export async function toggleEnrollment(
  year: number,
  month: number,
  isOpen: boolean,
) {
  await pool.query(
    `
    INSERT INTO enrollment_periods (year, month, is_open)
    VALUES ($1, $2, $3)
    ON CONFLICT (year, month)
    DO UPDATE SET is_open = $3
    `,
    [year, month, isOpen],
  );

  return { message: "Enrollment status updated" };
}

export async function getEnrollmentStatus(year: number, month: number) {
  const result = await pool.query(
    `
    SELECT year, month, is_open
    FROM enrollment_periods
    WHERE year = $1 AND month = $2
    `,
    [year, month],
  );

  if (result.rows.length === 0) {
    return { year, month, is_open: false };
  }

  return result.rows[0];
}
