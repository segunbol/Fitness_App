import express from "express";
import {
  neck,
  shoulders,
  upperArms,
  upperLegs,
  lowerArms,
  lowerLegs,
  back,
  cardio,
  chest,
  fullExercise
} from "../utils/data";
import Exercises from "../models/ExercisesModel";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  try {
    await Exercises.deleteMany({});
    const createdExercises = await Exercises.insertMany(fullExercise);
    // const createdshoulders = await Exercises.insertMany(shoulders);
    // const createdUpperArms = await Exercises.insertMany(upperArms);
    // const createdUpperLegs = await Exercises.insertMany(upperLegs);
    // const createdLowerLegs = await Exercises.insertMany(lowerLegs);
    // const createdLowerArms = await Exercises.insertMany(lowerArms);
    // const createdBack = await Exercises.insertMany(back);
    // const createdCardio = await Exercises.insertMany(cardio);
    // const createdChest = await Exercises.insertMany(chest);
    res.status(200).json(createdExercises);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
export default seedRouter;
