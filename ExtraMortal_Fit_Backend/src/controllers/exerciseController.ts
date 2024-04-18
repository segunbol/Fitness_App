import express, { Request, Response } from "express";
import Users from "../models/UserModel";
import Exercises from "../models/ExercisesModel";
import Gyms from "../models/GymModel";
import { GymInfo } from "../utils/types";
import {
  editUserSchema,
  updateUserStatusSchema,
} from "../validators/userValidator";
import bcrypt from "bcryptjs";
import { editGymSchema } from "../validators/gymValidator";

// Get exercises by body part
export const getExercisesByBodyPart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { bodypart } = req.params;
    console.log(bodypart);
    const exercises = await Exercises.find({ bodyPart: bodypart }); // Replace Exercise with your model name
    const count = exercises.length;
    if (!exercises) {
      return res
        .status(404)
        .json({ message: "No exercises found for this body part." });
    }

    return res.status(200).json({ count: count, exercises });
  } catch (err: any) {
    console.error(err.message);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching exercises." });
  }
};

// Get list of all body parts with exercises
export const getBodyPartList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bodyParts = await Exercises.distinct("bodyPart"); // Replace Exercise with your model name
    return res.status(200).json({ success: true, bodyParts });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get list of all equipment types
export const getEquipmentList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const equipmentTypes = await Exercises.distinct("equipment"); // Replace Exercise with your model name

    return res.status(200).json({ success: true, equipmentTypes });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get list of all target types
export const getTargetList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const targetTypes = await Exercises.distinct("target"); // Replace Exercise with your model name

    return res.status(200).json({ success: true, targetTypes });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get exercises by equipment type
export const getExercisesByEquipment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { type } = req.params;

    const exercises = await Exercises.find({ equipment: type }); // Replace Exercise with your model name
    const count = exercises.length;
    if (!exercises) {
      return res
        .status(404)
        .json({ message: "No exercises found for this equipment." });
    }

    return res.status(200).json({ success: true, count: count, exercises });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get exercises by target type
export const getExercisesByTarget = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { target } = req.params;

    const exercises = await Exercises.find({ target }); // Replace Exercise with your model name
    const count = exercises.length;
    if (!exercises) {
      return res
        .status(404)
        .json({ message: "No exercises found for this target muscle." });
    }

    return res.status(200).json({ success: true, count: count, exercises });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ message: "Error fetching exercises." });
  }
};

// Get exercise by ID
export const getExerciseById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const exercise = await Exercises.findById(id);
    return res.status(200).json({ success: true, exercise });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get exercise by name
export const getExerciseByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.params;
    const exercise = await Exercises.findOne({ name });
    return res.status(200).json({ success: true, exercise });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all exercises
export const getAllExercises = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const exercises = await Exercises.find();
    return res.status(200).json({ success: true, exercises });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};
