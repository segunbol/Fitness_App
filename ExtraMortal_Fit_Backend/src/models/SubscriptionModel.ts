import { Schema, PaginateModel, model } from "mongoose";
import { ISubscription } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const subscriptionSchema = new Schema<ISubscription>({
  id: { type: Schema.Types.ObjectId, required: false },
  userId: { type: Schema.Types.ObjectId, required: true },
  gymId: { type: Schema.Types.ObjectId, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
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

exports = Subscriptions