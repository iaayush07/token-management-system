import pool from "../config/db";

export async function getSubscriptions(month: string) {
  const result = await pool.query(
    `
    SELECT
      s.id,
      s."planName",
      s.status,
      s."startDate",
      s."endDate",
      u.id AS "userId",
      u."fullName",
      u.email
    FROM subscriptions s
    JOIN users u ON u.id = s."userId"
    WHERE
      s."startDate" <= (date_trunc('month', $1::date) + interval '1 month - 1 day')
      AND (s."endDate" IS NULL OR s."endDate" >= date_trunc('month', $1::date))
    ORDER BY s."startDate" DESC;
      `,
    [`${month}-01`],
  );

  return result.rows;
}

export async function upsertSubscription(
  userId: string,
  planName: string,
  status: "ACTIVE" | "INACTIVE",
  startDate: string,
  endDate: string | null,
) {
  await pool.query(
    `
    INSERT INTO subscriptions (
      "userId",
      "planName",
      status,
      "startDate",
      "endDate",
      "subscriptionMonth"
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      date_trunc('month', $4::date)
    )
    ON CONFLICT ("userId", "subscriptionMonth")
    DO UPDATE SET
      "planName" = EXCLUDED."planName",
      status = EXCLUDED.status,
      "startDate" = EXCLUDED."startDate",
      "endDate" = EXCLUDED."endDate"
    `,
    [userId, planName, status, startDate, endDate],
  );
}

export async function isEnrollmentOpen(month: string): Promise<boolean> {
  // month format expected: 'YYYY-MM'
  const result = await pool.query(
    `
    SELECT is_open
    FROM enrollment_periods
    WHERE year = EXTRACT(YEAR FROM to_date($1 || '-01', 'YYYY-MM-DD'))
      AND month = EXTRACT(MONTH FROM to_date($1 || '-01', 'YYYY-MM-DD'))
    `,
    [month],
  );

  if (result.rows.length === 0) return false;

  return result.rows[0].is_open;
}

export async function isUserSubscribedForMonth(
  userId: string,
  month: string,
): Promise<{ subscribed: boolean; planName?: string; status?: string }> {
  // month format expected: 'YYYY-MM'
  const result = await pool.query(
    `
    SELECT "planName", status
    FROM subscriptions
    WHERE "userId" = $1
      AND "subscriptionMonth" = date_trunc('month', to_date($2 || '-01', 'YYYY-MM-DD'))
      AND status = 'ACTIVE'
    LIMIT 1
    `,
    [userId, month],
  );

  if (result.rows.length === 0) {
    return { subscribed: false };
  }
  return {
    subscribed: true,
    planName: result.rows[0].planName,
    status: result.rows[0].status,
  };
}
