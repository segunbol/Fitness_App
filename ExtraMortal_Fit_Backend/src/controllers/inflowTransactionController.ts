import express, { Request, Response } from "express";
import inflowTransaction from "../models/inflowModel";
import { createInflowSchema } from "../validators/inflowValidator";
import Users from "../models/UserModel";
import Gyms from "../models/GymModel";

export const createInflow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req;

    const { value, error } = createInflowSchema.body.validate(req.body);
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    const {
      customerUserId,
      productId,
      gymId,
      price,
      quantity,
      totalAmount,
      paid,
    } = value;

    // get request user id
    console.log(user);
    const requserExist = await Users.findOne({
      userName: user.contactUsername,
    });

    if (!requserExist) {
      return res.status(500).json({
        success: false,
        message: "User Does Not Exist",
      });
    }

    // Check if UserId exist

    const userExist = await Users.findById(customerUserId);
    if (!userExist) {
      return res.status(500).json({
        success: false,
        message: "Customer Does Not Exist",
      });
    }
    const gymExist = await Gyms.findById(gymId);
    if (!gymExist) {
      return res.status(500).json({
        success: false,
        message: "Gym Does Not Exist",
      });
    }

    const inflow = new inflowTransaction({
      customerUserId,
      productId,
      gymId,
      price,
      quantity,
      totalAmount,
      createdBy: requserExist.id,
      paid,
    });
    const savedInflow = await inflow.save();

    return res.status(200).json(savedInflow);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllInflowPerGym = async (
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
      paid,
      unpaid,
      createdBy,
      period,
    } = req.query;

    if (!gymId) {
      return res.status(400).json({
        success: false,
        message: "gymId is required",
      });
    }

    // Create a filter object for the search query if provided
    const filter: any = { gymId };

    // Handle userId filter if provided
    if (userId) {
      filter.customerUserId = userId;
    }

    // Handle paid status filter if provided
    if (paid) {
      filter.paid = paid === "true";
    }
    if (unpaid) {
      filter.paid = paid === "false";
    }
    // Handle createdBy filter if provided
    if (createdBy) {
      filter.createdBy = createdBy;
    }

    // Handle date range filtering if provided
    if (start && end) {
      filter.createdAt = {
        $gte: new Date(start as string),
        $lte: new Date(end as string),
      };
    }

    // Handle period filtering (weekly, monthly, annually)
    if (period) {
      const now = new Date();
      let startDate: Date;
      switch (period) {
        case "weekly":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "monthly":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "annually":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = new Date(start as string);
      }
      filter.createdAt = {
        $gte: startDate,
        $lte: new Date(),
      };
    }

    // Determine the sorting criteria
    const sortOptions: any = {};
    if (sort) {
      const [field, order] = (sort as string).split(":");
      if (field && order) {
        sortOptions[field] = order === "desc" ? -1 : 1;
      }
    }

    // Pagination settings
    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sortOptions,
    };

    // Fetch all transactions that match the filter
    const allTransactions = await inflowTransaction.find(filter).exec();

    // Calculate the total amount using JavaScript
    const totalAmount = allTransactions.reduce(
      (sum, transaction) => sum + transaction.totalAmount,
      0
    );

    // Fetch paginated transactions if 'all' is not specified
    let transactions;
    if (all) {
      transactions = allTransactions;
    } else {
      transactions = await inflowTransaction.paginate(filter, options); // Assuming you use mongoose-paginate
    }

    return res.json({
      success: true,
      transactions,
      totalAmount,
    });
  } catch (err: any) {
    console.error("Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
