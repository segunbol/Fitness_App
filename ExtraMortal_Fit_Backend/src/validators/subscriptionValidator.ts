import { Joi } from "./joi";

export const createSubscriptionSchema = {
  body: Joi.object({
    customerUserId: Joi.objectId().required(),
    customerUsername: Joi.string().required(),
    gymId: Joi.objectId().required(),
    createdBy: Joi.objectId().allow(""),
    createdByUsername: Joi.string().allow(''),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(""),
    isActive: Joi.boolean().allow(""),
    subscriptionTypeCount: Joi.number().required(),
    subscriptionType: Joi.string().valid(
      "Monthly",
      "Quarterly",
      "Biannually",
      "Yearly"
    ),
  }),
};
