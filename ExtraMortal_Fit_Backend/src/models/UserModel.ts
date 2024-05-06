import { Schema, PaginateModel, model } from "mongoose";
import { IUser } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const urserSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Neither"],
      required: true,
    },
    currentWeight: { type: Number, required: false},
    targetWeight: { type: Number , required: false},
    focusArea: { type: String , enum: ["back","ardio","chest","lower arms","lower legs","neck", "shoulders","upper arms","upper legs","waist"], required: false},
    goals:{  type: String, enum: ["Keep fit", "Muscle gain", "Weight loss"], required: false },
    bmi: { type: Number, required: false },
    images:[{ type: String, required: false }],
    level: { type: String, enum: ["beginner", "intermediate", "expert"], required: false },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: false },
    gymSubscribed:[{gymId: { type: Schema.Types.ObjectId, ref: "Gyms", required: false },name: { type: String, required: false }}],
    image: { type: String, required: false },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: false },
    verified: { type: Boolean, default: false, required: false },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true, unique: true },
    state: { type: String, required: false },
    city: { type: String, required: false },
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

urserSchema.plugin(paginate);
const Users = model<IUser, PaginateModel<IUser>>("Users", urserSchema);

export default Users;
