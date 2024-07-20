import { Schema, PaginateModel, model } from "mongoose";
import { IProduct } from "../utils/types";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema<IProduct>(
  {
    gymId: { type: Schema.Types.ObjectId, ref: "Gyms", required: true },
    gymName: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
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

productSchema.plugin(paginate);
const Products = model<IProduct, PaginateModel<IProduct>>(
  "Products",
  productSchema
);

export default Products;
