import Joi from "joi";

export const createInflowSchema = {
  body: Joi.object({
    userId: Joi.objectId().required(),
    username: Joi.string().required(),
    product: Joi.string().required(),
    gymId: Joi.objectId().required(),
    gymName: Joi.string().trim().required(),
    quantity: Joi.number().required(),
    totalAmount: Joi.number().required(),
    paid: Joi.boolean().required(),
  }),
};
