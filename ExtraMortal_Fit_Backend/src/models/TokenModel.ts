import { Schema, PaginateModel, model } from "mongoose";
import { IToken } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const tokenSchema = new Schema<IToken>(
  {
    usedId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
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

tokenSchema .plugin(paginate);
const Token = model<IToken, PaginateModel<IToken>>(
  "Token",
  tokenSchema 
);


export default Token