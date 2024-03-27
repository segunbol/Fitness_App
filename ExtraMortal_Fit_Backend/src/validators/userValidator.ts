import { Joi } from "./joi";

export const userSignUpSchema = {
  body: Joi.object({
    userName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    firstName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("first name is required and accepts alphabets and spaces only."),
    lastName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("last name is required and accepts alphabets and spaces only."),
    phoneNo: Joi.string()
      .required()
      .length(11)
      .trim()
      .message('number should be in the "+2348012345678" format'),
    email: Joi.string().email().required().trim(),
    userImg: Joi.string().allow("", null),
    password: Joi.string(),
    gender: Joi.string().required().trim().valid("Male", "Female"),
    isAdmin: Joi.boolean().allow("", null),
    verified: Joi.boolean().allow("", null),
    state: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
  }),
};

export const userSignInSchema = {
  body: Joi.object({
    userName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    password: Joi.string(),
  }),
};
