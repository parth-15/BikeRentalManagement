import Joi from 'joi';

const reserveCreateValidator = Joi.object({
  user: Joi.string().required(),
  bike: Joi.string().required(),
  from: Joi.date().required(),
  to: Joi.date().required(),
});

const reserveUpdateValidator = Joi.object({
  user: Joi.string().required(),
  bike: Joi.string().required(),
  from: Joi.date().required(),
  to: Joi.date().required(),
});

export {reserveCreateValidator, reserveUpdateValidator};
