import { Schema, PaginateModel, model } from "mongoose";
import { IGym } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const gymSchema = new Schema<IGym>(
  {
    gymName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    contactPersonUserName: { type: String, required: true },
    contactPersonLastName: { type: String, required: true },
    contactPersonFirstName: { type: String, required: true },
    currency:{ type: String, required: true },
    phoneNo: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    gymImage: { type: String },
    gymImages: [{ type: String }],
    subscriptionTypeAndAmount: [{subType: { type: String,enum: ["Daily","Monthly","Biannually", "Annually"],  required: true },amount: { type: Number, required: true }, variation: { type: String,enum: ["Single","Couples"], required: true }}]
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

gymSchema.plugin(paginate);
const Gyms = model<IGym, PaginateModel<IGym>>("Gyms", gymSchema);

export default Gyms;
