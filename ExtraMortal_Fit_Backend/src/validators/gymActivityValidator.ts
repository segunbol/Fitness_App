import { Joi } from "./joi";


export const gymActivitySchemaValidator = {
  body: Joi.object({
    gymId: Joi.string().trim().required(),
    gymName: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    day: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')).required(),
    sessionStart: Joi.string().trim().required(),
    sessionEnd: Joi.string().trim().required(),
    image: Joi.string().trim().allow(''),
    images: Joi.array().items(Joi.string().trim()).allow(''),
    videos: Joi.array().items(Joi.string().trim()).allow(''),
    equipments: Joi.array().items(Joi.string().trim()).allow(''),
  }),
};

export const updateGymActivitySchemaValidator = {
    body: Joi.object({
      gymId: Joi.string().trim(),
      gymName: Joi.string().trim(),
      name: Joi.string().trim(),
      description: Joi.string().trim(),
      day: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
      sessionStart: Joi.string().trim(),
      sessionEnd: Joi.string().trim(),
      image: Joi.string().trim().allow(''),
      images: Joi.array().items(Joi.string().trim()).allow(''),
      videos: Joi.array().items(Joi.string().trim()).allow(''),
      equipments: Joi.array().items(Joi.string().trim()).allow(''),
    }),
  };
