import express from "express";
import { authenticate, checkGym } from "../middlewares/authentication";
import {
  CreateProduct,
  GetProductById,
  GetProducts,
} from "../controllers/productController";

const router = express.Router();

router.post("/:gymid", authenticate, checkGym, CreateProduct);
router.get("/products", authenticate, checkGym, GetProducts);
router.get("/products/:id", authenticate, checkGym, GetProductById);

export default router;
