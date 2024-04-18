import express, { Request, Response } from "express";
import Users from "../models/UserModel";
import Gyms from "../models/GymModel";
import { createSubscriptionSchema } from "../validators/subscriptionValidator";
import Subscriptions from "../models/SubscriptionModel";
import bcrypt from "bcryptjs";
import { calculateEndDated } from "../utils/dates";
import { isFloat64Array } from "util/types";
import { Types } from "mongoose";

export const createSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req;
    console.log(user);

    const { value, error } = createSubscriptionSchema.body.validate(req.body);
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    const {
      customerUserId,
      customerUsername,
      gymId,
      startDate,
      subscriptionTypeCount,
      subscriptionType,
    } = value;

    // get request user id
    // console.log(user.contactUsername);
    const requserExist = await Users.findOne({
      userName: user.contactUsername,
    });
    // console.log(requserExist)
    if (!requserExist) {
      return res.status(500).json({
        success: false,
        message: "User Does Not Exist",
      });
    }
    // Check If the request User is Creating subscription for its own gym
    if (user.gymid != gymId) {
      return res.status(500).json({
        success: false,
        message: "You Are Out Of Bound",
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

    // Calculate End Date
    const calEndDated = calculateEndDated(
      startDate,
      subscriptionTypeCount,
      subscriptionType
    );

    // Evaluate Active Status
    let status;
    const currentDate = new Date();
    if (currentDate >= startDate) {
      status = true;
    } else {
      status = false;
    }
    console.log(calEndDated);
    const newSubscription = new Subscriptions({
      customerUserId,
      customerUsername: userExist.userName,
      gymId: user.gymid,
      createdBy: requserExist.id,
      createdByUsername: requserExist.userName,
      startDate,
      endDate: calEndDated,
      isActive: status,
      subscriptionTypeCount,
      subscriptionType,
    });
    const savedSub = await newSubscription.save();
    return res.status(200).json(savedSub);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllSubscriptions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req.headers;
    const { authorization } = req.headers;
    console.log(authorization);
    console.log(user);
    const allUsers = await Subscriptions.find().select({
      customerUserId: 1,
      customerUsername: 1,
      gymId: 1,
      startDate: 1,
      endDate: 1,
      isActive: 1,
    });

    return res.status(200).json(allUsers);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getGymSubscribers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const gymId = req.params.id;
    const { user } = req;
    console.log(user);
    const subscribers = await Subscriptions.find({ gymId: user.gymid })
      .distinct("customerUsername")
      .populate("customerUserId");
    // .select({
    //   customerUserId: 1,
    //   customerUsername: 1,
    //   gymId: 1,
    //   startDate: 1,
    //   endDate: 1,
    //   isActive: 1,
    // });
    if (!subscribers) {
      return res
        .status(404)
        .json({ success: false, message: "No Subscribers found" });
    }

    return res.status(200).json(subscribers);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserSubscribedGyms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.params);
    const customerUserId = req.params.id;
    const gyms = await Subscriptions.find({ customerUserId }).distinct("gymId");
    return res.status(200).json(gyms);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getActiveSubscriptions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const currentDate = new Date();
    console.log(currentDate);
    const activeSubscriptions = await Subscriptions.find({
      endDate: { $gt: currentDate },
    });
    return res.json(activeSubscriptions);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSubscriptionStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user } = req;
    const gymId = user.gymid; // Retrieve gymId from authenticated user

    const currentDate = new Date();

    // Find all subscriptions for the given gymId
    const subscriptions = await Subscriptions.find({ gymId });

    // Iterate through each subscription and update isActive field
    const updatePromises = subscriptions.map(async (subscription) => {
      // Determine isActive status for each subscription
      const isActive =
        subscription.startDate <= currentDate &&
        subscription.endDate >= currentDate;

      // Update isActive field accordingly
      subscription.isActive = isActive;

      // Save the updated subscription
      await subscription.save();
    });

    // Wait for all update operations to complete
    await Promise.all(updatePromises);

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Subscriptions updated successfully.",
      updatedCount: subscriptions.length,
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getGymSubscriptionSummary = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const gymId = req.params.gymid;
    const objectIdGymId = new Types.ObjectId(gymId);

    const subscriptions = await Subscriptions.aggregate([
      {
        $match: {
          gymId: objectIdGymId,
        },
      },
      {
        $sort: {
          customerUserId: 1,
          endDate: -1, // Sort by customer ID (ascending) and endDate (descending)
        },
      },
      {
        $group: {
          _id: "$customerUserId", // Group by customerUserId
          mostRecentSubscription: { $first: "$$ROOT" }, // Get the first document (most recent endDate)
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the result
          mostRecentSubscription: 1, // Include mostRecentSubscription object
        },
      },
    ]);
    const { active, inactive, total } = req.query;

    let summary;

    if (active) {
      const activeSubscribers: any = subscriptions.filter(
        (sub) => sub.mostRecentSubscription.isActive
      );
      summary = {
        list: activeSubscribers.map((sub: any) => sub.mostRecentSubscription),
      };
    }
    if (inactive) {
      const inactiveSubscribers = subscriptions.filter(
        (sub) => !sub.mostRecentSubscription.isActive
      );
      summary = {
        list: inactiveSubscribers.map((sub) => sub.mostRecentSubscription),
      };
    }

    if (total) {
      const totalSubscribersCount = subscriptions.length;
      summary = {
        list: subscriptions.map((sub) => sub.mostRecentSubscription),
      };
    }
    // console.log(req.query)
    if (!active && !inactive && !total) {
      const activeSubscribers = subscriptions.filter(
        (sub) => sub.mostRecentSubscription.isActive
      );
      const inactiveSubscribers = subscriptions.filter(
        (sub) => !sub.mostRecentSubscription.isActive
      );

      const totalSubscribersCount = subscriptions.length;

      summary = {
        activeSubscribers: {
          count: activeSubscribers.length,
        },
        inactiveSubscribers: {
          count: inactiveSubscribers.length,
        },
        totalSubscribers: {
          count: totalSubscribersCount,
        },
      };
    }

    return res.status(200).send(summary);
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAllSub = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // const gym = await Subscriptions.findById(req.params.id);
    // if (!gym) {
    //   return res.json("Subscription Not Found");
    // }
    // await Subscriptions.findByIdAndDelete(req.params.id);
    await Subscriptions.deleteMany({});
    return res.status(200).json("All Subscriptions Deleted Succesfully");
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// export const getGymActiveSubscribers = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     if (req.user._id != req.params.id) {
//       return res.status(400).json({
//         success: false,
//         message: "Not Permitted",
//       });
//     }
//     const { value, error } = editUserSchema.body.validate(req.body);
//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }
//     const {
//       userName,
//       firstName,
//       lastName,
//       phoneNo,
//       email,
//       userImg,
//       password,
//       gender,
//       state,
//       city,
//     } = value;
//     let hashedPassword;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       hashedPassword = await bcrypt.hashSync(password, salt);
//     }
//     const user = await Users.findById(req.params.id);
//     if (user) {
//       user.userName = userName || user.userName;
//       user.firstName = firstName || user.firstName;
//       user.lastName = lastName || user.lastName;
//       user.phoneNo = phoneNo || user.phoneNo;
//       user.email = email || user.email;
//       user.userImg = userImg || user.userImg;
//       user.password = hashedPassword || user.password;
//       user.gender = gender || user.gender;
//       user.state = state || user.state;
//       user.city = city || user.city;

//       const updatedUser = await user.save();

//       return res.json({ message: "User Updated", user: updatedUser });
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

// export const getUserSubscriptions = async (
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

// export const deleteUser = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const user = await Users.findById(req.params.id);
//     if (!user) {
//       return res.json("User Not Found");
//     }
//     await Users.findByIdAndDelete(req.params.id);
//     return res.status(200).json("User Deleted Succesfully");
//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
