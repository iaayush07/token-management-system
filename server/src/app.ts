import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Token Management System",
  });
});

export default app;
