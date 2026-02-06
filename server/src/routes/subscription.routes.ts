import { Router } from "express";
import {
  listSubscriptions,
  saveSubscription,
} from "../controllers/subscription.controller";

const router = Router();

router.get("/", listSubscriptions);
router.post("/", saveSubscription);

export default router;
