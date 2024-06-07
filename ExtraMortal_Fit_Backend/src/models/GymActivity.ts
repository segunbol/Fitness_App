import { Schema, PaginateModel, model } from "mongoose";
import { IGymActivity } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const gymActivitySchema = new Schema<IGymActivity>(
  {
    gymId: { type: Schema.Types.ObjectId, ref: "Gyms", required: true },
    gymName: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    day:[{ type: String, required: true }],
    sessionStart: { type: String, required: true },
    sessionEnd: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String, required: true }],
    videos: [{ type: String, required: true }],
    equipments:[{ type: String, required: true }],
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

gymActivitySchema.plugin(paginate);
const GymActivity = model<IGymActivity, PaginateModel<IGymActivity>>("GymActivity",  gymActivitySchema);

export default GymActivity;
