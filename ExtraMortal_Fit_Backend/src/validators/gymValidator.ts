import { Joi } from "./joi";

export const gymSignUpSchema = {
  body: Joi.object({
    gymName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    contactPersonFirstName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("first name is required and accepts alphabets and spaces only."),
    contactPersonLastName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("last name is required and accepts alphabets and spaces only."),
    contactPersonUserName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("last name is required and accepts alphabets and spaces only."),
    phoneNo: Joi.string()
      .required()
      .length(11)
      .trim()
      .message('number should be in the "08012345678" format'),
    email: Joi.string().email().required().trim(),
    gymImage: Joi.string().allow("", null),
    password: Joi.string(),
    address: Joi.string().required().trim(),
    verified: Joi.boolean().allow("", null),
    state: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    country: Joi.string().required().trim(),
    subscriptionTypeAndAmount: Joi.array().items(Joi.object({
      subType: Joi.string().valid("Daily", "Monthly", "Biannually", "Annually").required(),
      amount: Joi.number().required(),
      variation: Joi.string().valid("Single", "Couples").required()
    })).required(),
    currency: Joi.string().required().trim(),
    gymImages: Joi.string().allow("", null),
  }),
};

export const gymSignInSchema = {
  body: Joi.object({
    gymName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    password: Joi.string(),
  }),
};

export const editGymSchema = {
  body: Joi.object({
    contactPersonFirstName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    gymName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    contactPersonUserName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("first name is required and accepts alphabets and spaces only."),
    contactPersonLastName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("last name is required and accepts alphabets and spaces only."),
    phoneNo: Joi.string()
      .allow("", null)
      .length(11)
      .trim()
      .message('number should be in the "+2348012345678" format'),
    email: Joi.string().email().allow("", null).trim(),
    gymImg: Joi.string().allow("", null),
    password: Joi.string().allow("", null),
    address: Joi.string().allow("", null).trim(),
    state: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    country: Joi.string().required().trim(),
    gymImage: Joi.string(),
    subscriptionTypeAndAmount: Joi.array().items(Joi.object({
      subType: Joi.string().valid("Daily", "Monthly", "Biannually", "Annually").required(),
      amount: Joi.number().required(),
      variation: Joi.string().valid("Single", "Couples").required()
    })).required(),
    currency: Joi.string().required().trim(),
    gymImages: Joi.string().allow("", null),
  }),
};
