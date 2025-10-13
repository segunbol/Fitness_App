import express, { Request, Response } from "express";
import expenseTransaction from "../models/OutflowModel";
import { createExpenseTransaction } from "../validators/outflowValidator";
import Users from "../models/UserModel";
import Gyms from "../models/GymModel";

export const createExpense = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req;

    const { value, error } = createExpenseTransaction.body.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const {
      gymId,
      gymName,
      userId,
      item,
      expenseType,
      itemDescription,
      quantity,
      unitCost,
      unitDescription,
      purchaseDate,
      lifeSpan,
      period,
    } = value;

    const gymExists = await Gyms.findById(gymId);
    if (!gymExists) {
      return res.status(404).json({
        success: false,
        message: "Gym does not exist",
      });
    }

    const expense = new expenseTransaction({
      gymId,
      gymName,
      userId,
      item,
      expenseType,
      itemDescription,
      quantity,
      unitCost,
      unitDescription,
      purchaseDate,
      lifeSpan,
      period,
      createdBy: user.id,
    });

    const savedExpense = await expense.save();

    return res.status(201).json({
      success: true,
      expense: savedExpense,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllExpenses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      search,
      sort,
      page = 1,
      limit = 10,
      start,
      end,
      all,
      gymId,
      userId,
      period,
    } = req.query;

    const filter: any = {};

    if (gymId) {
      filter.gymId = gymId;
    }

    if (userId) {
      filter.createdBy = userId;
    }

    if (start && end) {
      filter.purchaseDate = {
        $gte: new Date(start as string),
        $lte: new Date(end as string),
      };
    }

    if (period) {
      const now = new Date();
      let startDate: Date;
      switch (period) {
        case "monthly":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "yearly":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = new Date(start as string);
      }
      filter.purchaseDate = {
        $gte: startDate,
        $lte: new Date(),
      };
    }

    if (search) {
      filter.item = { $regex: search, $options: "i" };
    }

    const sortOptions: any = {};
    if (sort) {
      const [field, order] = (sort as string).split(":");
      sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sortOptions,
    };

    const allExpenses = await expenseTransaction.find(filter).exec();
    const totalCost = allExpenses.reduce(
      (sum, expense) => sum + expense.unitCost * expense.quantity,
      0
    );

    let expenses;
    if (all) {
      expenses = allExpenses;
    } else {
      expenses = await expenseTransaction.paginate(filter, options);
    }

    return res.json({
      success: true,
      expenses,
      totalCost,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateExpenseTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedExpense = await expenseTransaction.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense transaction not found",
      });
    }

    return res.json({
      success: true,
      expense: updatedExpense,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteExpenseTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedExpense = await expenseTransaction.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense transaction not found",
      });
    }

    return res.json({
      success: true,
      message: "Expense transaction deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
