import express, { Request, Response } from "express";
import Users from "../models/UserModel";
import { UserInfo } from "../utils/types";
import {
  editUserSchema,
  updateUserStatusSchema,
} from "../validators/userValidator";
import bcrypt from "bcryptjs";

{
  /*The getAll Users will have two conditional response based on permissions
1. Super Admin User will have access to all Users across all Gyms and those not under a gym
2. Gym Admin User will have access to view all Users that has subscribed to their gym
*/
}
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req.headers;
    const { authorization } = req.headers;
    console.log(authorization);
    console.log(user);
    const allUsers = await Users.find();

    return res.status(200).json(allUsers);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

{
  /*The getUser will have three conditional responses based on permissions
1. A gym user can view their own details
2. A gym admin can view individuals details subscribed to their gym
3. A super admin can view all individual details
*/
}
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId); // removed {}

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const info: UserInfo = user.toObject();
    delete info.password;

    return res.status(200).json(info);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

{
  /*The Update status will only be accessible by gym owners for their gyms alone
   */
}
export const updateUserStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.user);
    const { authorization } = req.headers;
    console.log(authorization);
    const { value, error } = updateUserStatusSchema.body.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { userName, isAdmin, verified, email } = value;
    const user = await Users.findById(req.params.id);
    if (user) {
      user.userName = userName || user.userName;
      user.isAdmin = isAdmin || user.isAdmin;
      user.verified = verified || user.verified;
      user.email = email || user.email;

      const updatedUserStatus = await user.save();

      return res.json({ message: "User Updated", user: updatedUserStatus });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
{
  /*The Update User data can only be done by the user*/
}
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (req.user._id != req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Not Permitted",
      });
    }
    const { value, error } = editUserSchema.body.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const {
      userName,
      firstName,
      lastName,
      phoneNo,
      email,
      userImg,
      password,
      gender,
      state,
      city,
    } = value;
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hashSync(password, salt);
    }
    const user = await Users.findById(req.params.id);
    if (user) {
      user.userName = userName || user.userName;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.phoneNo = phoneNo || user.phoneNo;
      user.email = email || user.email;
      user.userImg = userImg || user.userImg;
      user.password = hashedPassword || user.password;
      user.gender = gender || user.gender;
      user.state = state || user.state;
      user.city = city || user.city;

      const updatedUser = await user.save();

      return res.json({ message: "User Updated", user: updatedUser });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.json("User Not Found");
    }
    await Users.findByIdAndDelete(req.params.id);
    return res.status(200).json("User Deleted Succesfully");
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
