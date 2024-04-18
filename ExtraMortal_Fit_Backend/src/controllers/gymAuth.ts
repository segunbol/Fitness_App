import mongoose from "mongoose";
import { Request, Response } from "express";
import Users from "../models/UserModel";
import Gyms from "../models/GymModel";
import bcrypt from "bcryptjs";
import Token from "../models/TokenModel";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { UserInfo } from "../utils/types";
import { gymSignInSchema, gymSignUpSchema } from "../validators/gymValidator";

export const GymSignUp = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const { error, value } = gymSignUpSchema.body.validate(req.body);
    console.log(value);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const {
      gymName,
      password,
      address,
      city,
      state,
      email,
      contactPersonUserName,
      contactPersonLastName,
      contactPersonFirstName,
      phoneNo,
      verified,
      gymImg,
    } = value;
    const checkUser = await Users.findOne({ userName: contactPersonUserName });
    if (!checkUser) {
      return res.status(500).json({
        success: false,
        message: "Username does not exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new Gyms({
      gymName,
      password: hashedPassword,
      address,
      city,
      state,
      email,
      contactPersonUserName: checkUser.userName,
      contactPersonLastName: checkUser.lastName,
      contactPersonFirstName: checkUser.firstName,
      phoneNo,
      verified,
      gymImg,
    });
    const savedGym = await newUser.save();

    // const userId = savedGym._id;
    // const userEmail = savedGym.email;
    // let token = await new Token({
    //   userId: userId,
    //   token: crypto.randomBytes(32).toString("hex"),
    // }).save();

    // const link = `https://shoboloyoke.onrender.com/api/v1/auth/verify/${userId}/${token.token}`;
    // const subject = "Confirm Your Email";
    // let result = username.charAt(0).toUpperCase() + username.slice(1);
    // console.log(result);
    // await sendEmail(userEmail, subject, link, result);

    res.status(200).json(savedGym);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const gymSignIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.body);
    const { error, value } = gymSignInSchema.body.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { gymName, password } = value;

    const gym = await Gyms.findOne({ gymName: gymName });

    if (!gym) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(password, gym.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const SECRET = process.env.SECRET || "";
    const token = jwt.sign(
      {
        gymid: gym._id,
        gymName: gym.gymName,
        verified: gym.verified,
        contactUsername: gym.contactPersonUserName,
      },
      SECRET,
      { expiresIn: "1d" }
    );
    const info: UserInfo = gym.toObject(); // Assign to the optional type
    delete info.password;
    // const info = user.toObject();
    // req.user = {
    //   _id: user.id,
    //   userName: user.userName,
    //   isAdmin: user.isAdmin,
    // };
    // console.log(req);

    return res.cookie("token", token).status(200).json({ info, token: token });

    // Do something with the validated user data

    // Return  a success response
    // return res.status(200).json({
    //   success: true,
    //   message: "Sign in successful",
    // });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const gymSignOut = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    delete req.user;
    console.log(req.headers.user);
    return res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send(`User logged out successfully!`);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
