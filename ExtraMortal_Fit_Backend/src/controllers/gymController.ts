import express, { Request, Response } from "express";
import Users from "../models/UserModel";
import Gyms from "../models/GymModel";
import { GymInfo } from "../utils/types";
import bcrypt from "bcryptjs";
import { editGymSchema } from "../validators/gymValidator";

{
  /*The getAll Users will have two conditional response based on permissions
1. Super Admin User will have access to all Users across all Gyms and those not under a gym
2. Gym Admin User will have access to view all Users that has subscribed to their gym
*/
}
export const getAllGyms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req.headers;
    const { authorization } = req.headers;
    
    const allGyms = await Gyms.find();

    return res.status(200).json(allGyms);
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
export const getGym = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const gymId = req.params.id;
    const gym = await Gyms.findById(gymId); // removed {}

    if (!gym) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const info: GymInfo = gym.toObject();
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

// export const updateGymStatus = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     console.log(req.user);
//     const { authorization } = req.headers;
//     console.log(authorization);
//     const { value, error } = updateUserStatusSchema.body.validate(req.body);
//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }
//     const { userName, isAdmin, verified, email } = value;
//     const user = await Users.findById(req.params.id);
//     if (user) {
//       user.userName = userName || user.userName;
//       user.isAdmin = isAdmin || user.isAdmin;
//       user.verified = verified || user.verified;
//       user.email = email || user.email;

//       const updatedUserStatus = await user.save();

//       return res.json({ message: "User Updated", user: updatedUserStatus });
//     } else {
//       return res.status(404).json({ message: "User Not Found" });
//     }
//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
{
  /*The Update User data can only be done by the user*/
}
export const updateGym = async (
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
    const { value, error } = editGymSchema.body.validate(req.body);
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
      gymImage,
      country,
      subscriptionTypeAndAmount,
      currency,
      gymImages,
    } = value;
    let hashedPassword;
    if (contactPersonUserName) {
      const checkUser = await Users.findOne({
        userName: contactPersonUserName,
      });
      if (!checkUser) {
        return res.status(500).json({
          success: false,
          message: "Username does not exist",
        });
      }
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hashSync(password, salt);
    }
    const gym = await Gyms.findById(req.params.id);
    if (gym) {
      gym.gymName = gymName || gym.gymName;
      gym.contactPersonUserName =
        contactPersonUserName || gym.contactPersonUserName;
      gym.contactPersonLastName =
        contactPersonLastName || gym.contactPersonLastName;
      gym.phoneNo = phoneNo || gym.phoneNo;
      gym.email = email || gym.email;
      gym.gymImage = gymImage || gym.gymImage;
      gym.password = hashedPassword || gym.password;
      gym.contactPersonFirstName =
        contactPersonFirstName || gym.contactPersonFirstName;
      gym.address = address || gym.address;
      gym.state = state || gym.state;
      gym.city = city || gym.city;
      gym.country = country || gym.country;
      gym.subscriptionTypeAndAmount = subscriptionTypeAndAmount || gym.subscriptionTypeAndAmount;
      gym.currency = currency || gym.currency;
      gym.gymImages = gymImages || gym.gymImages;

      const updatedGym = await gym.save();

      return res.json({ message: "Gym Updated", gym: updatedGym });
    } else {
      return res.status(404).json({ message: "Gym Not Found" });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteGym = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const gym = await Gyms.findById(req.params.id);
    if (!gym) {
      return res.json("Gym Not Found");
    }
    await Gyms.findByIdAndDelete(req.params.id);
    return res.status(200).json("Gym Deleted Succesfully");
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
