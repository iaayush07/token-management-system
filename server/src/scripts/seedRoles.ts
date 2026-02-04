import "dotenv/config";
import pool from "../config/db";

async function seedRoles() {
  const roles = ["EMPLOYEE", "ADMIN"];

  for (const role of roles) {
    await pool.query(
      "INSERT INTO roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
      [role],
    );
  }

  console.log("Roles seeded successfully");
  process.exit(0);
}

seedRoles().catch((err) => {
  console.error("Failed to seed roles", err);
  process.exit(1);
});
