import express from "express";
import {
  createExpense,
  getAllExpenses,
  updateExpenseTransaction,
  deleteExpenseTransaction,
} from "../controllers/outflowTransaction";
import { authenticate, checkGym } from "../middlewares/authentication";

const router = express.Router();

// Create a new expense transaction
router.post("/:gymid", authenticate, checkGym, createExpense);

// Get all expense transactions with filters, search, sorting, and pagination
router.get("/", authenticate, getAllExpenses);

// Update an expense transaction by ID
router.put("/:id", authenticate, updateExpenseTransaction);

// Delete an expense transaction by ID
router.delete("/:id", authenticate, deleteExpenseTransaction);

export default router;
