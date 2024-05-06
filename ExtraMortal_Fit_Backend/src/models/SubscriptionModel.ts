import { Schema, PaginateModel, model } from "mongoose";
import { ISubscription } from "../utils/types";
import paginate from "mongoose-paginate-v2";
import Gyms from "./GymModel";

const subscriptionSchema = new Schema<ISubscription>(
  {
    id: { type: Schema.Types.ObjectId, required: false },
    customerUserId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    customerUsername: { type: String, required: true },
    gymId: { type: Schema.Types.ObjectId, ref: "Gyms", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true },
    subscriptionTypeCount: { type: Number, default: 1 },
    subscriptionType: {
      type: String,
      enum: ["Monthly", "Quarterly", "Biannually", "Annually"],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    createdByUsername: { type: String, required: true },
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
subscriptionSchema.plugin(paginate);
const Subscriptions = model<ISubscription, PaginateModel<ISubscription>>(
  "Subscriptions",
  subscriptionSchema
);

export default Subscriptions;
