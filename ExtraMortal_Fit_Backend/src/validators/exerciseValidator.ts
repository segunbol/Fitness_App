import { Joi } from "./joi";

export const createExerciseSchema = {
  body: Joi.object({
    bodyPart: Joi.string().required().trim().message("Body part is required."),
    equipment: Joi.string().required().trim().message("Equipment is required."),
    gifUrl: Joi.string().required().trim().message("GIF URL is required."),
    name: Joi.string().required().trim().message("Exercise name is required."),
    target: Joi.string()
      .required()
      .trim()
      .message("Target muscle is required."),
    secondaryMuscles: Joi.array()
      .items(Joi.string().required().trim())
      .min(1)
      .required()
      .message("Secondary muscles are required (minimum 1)."),
    instructions: Joi.array()
      .items(Joi.string().required().trim())
      .min(1)
      .required()
      .message("Instructions are required (minimum 1)."),
    difficulty: Joi.string()
      .required()
      .trim()
      .valid("easy", "medium", "hard")
      .message("Difficulty level is required (easy, medium, hard)."),
    level: Joi.string()
      .required()
      .trim()
      .valid("beginner", "intermediate", "expert")
      .message("Level is required (beginner, intermediate, expert)."),
  }),
};

export const updateExerciseSchema = {
  body: Joi.object({
    bodyPart: Joi.string().trim(),
    equipment: Joi.string().trim(),
    gifUrl: Joi.string().trim(),
    name: Joi.string().trim(),
    target: Joi.string().trim(),
    secondaryMuscles: Joi.array().items(Joi.string().trim()),
    instructions: Joi.array().items(Joi.string().trim()),
    difficulty: Joi.string().trim().valid("easy", "medium", "hard"),
    level: Joi.string().trim().valid("beginner", "intermediate", "expert"),
  }),
};
