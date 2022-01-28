import Joi from 'joi';

const bikeCreateValidator = Joi.object({
  model: Joi.string().required(),
  color: Joi.string().required(),
  location: Joi.string().required(),
  available: Joi.boolean().required(),
});

const bikeUpdateValidator = Joi.object({
  model: Joi.string().required(),
  color: Joi.string().required(),
  location: Joi.string().required(),
  available: Joi.boolean().required(),
});

export {bikeCreateValidator, bikeUpdateValidator};
