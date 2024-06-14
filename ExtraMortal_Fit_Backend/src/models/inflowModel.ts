import { Schema, PaginateModel, model } from "mongoose";
import { IInflow } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const inflowTransactionSchema = new Schema<IInflow>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    username: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    gymId: { type: Schema.Types.ObjectId, ref: "Gyms", required: true },
    gymName: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paid: { type: Boolean, required: true },
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

inflowTransactionSchema.plugin(paginate);
const inflowTransaction = model<IInflow, PaginateModel<IInflow>>(
  "Inflow",
  inflowTransactionSchema
);

export default inflowTransaction;
