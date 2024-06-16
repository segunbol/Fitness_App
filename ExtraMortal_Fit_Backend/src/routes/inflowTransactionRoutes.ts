import express from "express";
import { createInflow } from "../controllers/inflowTransactionController";
import { authenticate, checkGym } from "../middlewares/authentication";

const router = express.Router();

router.post("/:gymid", authenticate, checkGym, createInflow);

export default router;
