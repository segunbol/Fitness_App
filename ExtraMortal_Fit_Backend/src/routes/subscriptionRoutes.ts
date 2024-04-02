import express from "express";
import {
  createSubscription,
  deleteAllSub,
  getActiveSubscriptions,
  getAllSubscriptions,
  getGymSubscribers,
  getUserSubscribedGyms,
  updateSubscriptionStatus,
} from "../controllers/subscriptionController";
import { authenticate, checkGym } from "../middlewares/authentication";

const router = express.Router();

router.post("/", authenticate, checkGym, createSubscription);
router.get("/", authenticate, getAllSubscriptions);
router.get("/user/:id", authenticate, getUserSubscribedGyms);
router.get("/:gymid", authenticate, checkGym, getGymSubscribers);
router.put("/:gymid", authenticate, checkGym, updateSubscriptionStatus);
router.get("/status/:gymid", authenticate, checkGym, getActiveSubscriptions);
router.delete("/", authenticate, checkGym, deleteAllSub);

export default router;
