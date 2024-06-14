import { Schema, PaginateModel, model } from "mongoose";
import { IExpense } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const expenseTransactionSchema = new Schema<IExpense>(
  {
    gymId: { type: Schema.Types.ObjectId, ref: "Gyms", required: true },
    gymName: { type: String, required: true },
    item: { type: String, required: true },
    expenseType: {
      type: String,
      enum: ["capital expense", "recurring expense"],
      required: true,
    },
    itemDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    unitDescription: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    lifeSpan: { type: Number, required: true },
    period: { type: String, enum: ["month", "year"], required: false },
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

expenseTransactionSchema.plugin(paginate);
const expenseTransaction = model<IExpense, PaginateModel<IExpense>>(
  "ExpenseTransaction",
  expenseTransactionSchema
);

export default expenseTransaction;
