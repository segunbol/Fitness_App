import Joi from "joi";

export const createExpenseTransaction = {
  body: Joi.object({
    gymId: Joi.objectId().required(),
    gymName: Joi.string().trim().required(),
    item: Joi.string().trim().required(),
    expenseType: Joi.string()
      .trim()
      .valid("capital expense", "recurring expense")
      .required(),
    itemDescription: Joi.string().trim().required(),
    quantity: Joi.number().required(),
    unitCost: Joi.number().required(),
    unitDescription: Joi.string().trim().required(),
    purchaseDate: Joi.date().required(),
    lifeSpan: Joi.number().required(),
    period: Joi.string().trim().valid("month", "year").optional(),
  }),
};
