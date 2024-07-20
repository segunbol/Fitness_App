import Joi from "joi";

export const createInflowSchema = {
  body: Joi.object({
    customerUserId: Joi.objectId().required(),
    productId: Joi.string().required(),
    gymId: Joi.objectId().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    totalAmount: Joi.number().required(),
    paid: Joi.boolean().required(),
  }),
};
