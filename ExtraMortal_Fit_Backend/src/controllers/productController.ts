import { Request, Response } from "express";
import Products from "../models/ProductModel";
import { createProduct } from "../validators/productValidator";

export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const { error, value } = createProduct.body.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const {
      gymId,
      gymName,
      name,
      image,
      category,
      description,
      price,
      countInStock,
    } = value;

    const checkProduct = await Products.findOne({ name });
    if (checkProduct) {
      return res.status(500).json({
        success: false,
        message: "Product does not exist",
      });
    }

    const newUser = new Products({
      gymId,
      gymName,
      name,
      image,
      category,
      description,
      price,
      countInStock,
    });

    const savedProduct = await newUser.save();

    res.status(200).json(savedProduct);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const products = await Products.find(searchQuery)
      .skip(((page as number) - 1) * (limit as number))
      .limit(limit as number);

    const total = await Products.countDocuments(searchQuery);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        pages: Math.ceil(total / (limit as number)),
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const GetProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
