import express from "express";
import {
  createInflow,
  getAllInflowPerGym,
} from "../controllers/inflowTransactionController";
import { authenticate, checkGym } from "../middlewares/authentication";

const router = express.Router();

router.post("/:gymid", authenticate, checkGym, createInflow);
router.get("/", authenticate, getAllInflowPerGym);

export default router;
