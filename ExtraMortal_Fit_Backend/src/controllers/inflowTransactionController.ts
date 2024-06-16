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
