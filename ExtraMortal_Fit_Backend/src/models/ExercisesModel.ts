import { Schema, PaginateModel, model } from "mongoose";
import { IExercises } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const exerciseSchema = new Schema<IExercises>(
  {
    bodyPart: { type: String, required: true },
    equipment: { type: String, required: true },
    gifUrl: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    target: { type: String, required: true },
    secondaryMuscles: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
    toJSON: {
      getters: true,
      virtuals: true,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

exerciseSchema.plugin(paginate);
const Exercises = model<IExercises, PaginateModel<IExercises>>(
  "Exercises",
  exerciseSchema
);

exports = Exercises;
