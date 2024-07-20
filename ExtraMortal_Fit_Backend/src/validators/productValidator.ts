import Joi from "joi";

export const createProduct = {
  body: Joi.object({
    gymId: Joi.objectId().required().messages({
      "any.required": "gymId is required",
      "string.pattern.name": "Invalid gymId format",
    }),
    gymName: Joi.string().required().messages({
      "any.required": "gymName is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "name is required",
    }),
    image: Joi.string().optional().allow(""),
    category: Joi.string().optional().allow(""),
    countInStock: Joi.number().required(),
    description: Joi.string().optional().allow(""),
    price: Joi.number().required().messages({
      "any.required": "price is required",
    }),
  }),
};
