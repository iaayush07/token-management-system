import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import qrRoutes from "./routes/qr.routes";
import enrollmentRoutes from "./routes/enrollment.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/enrollment", enrollmentRoutes);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Token Management System",
  });
});

export default app;
