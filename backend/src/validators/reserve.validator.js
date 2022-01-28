import Joi from 'joi';

const reserveCreateValidator = Joi.object({
  user: Joi.string().required(),
  bike: Joi.string().required(),
  from: Joi.date().min(new Date().toISOString().slice(0, 10)).required(),
  to: Joi.date().min(Joi.ref('from')).required(),
});

const reserveUpdateValidator = Joi.object({
  user: Joi.string().required(),
  bike: Joi.string().required(),
  from: Joi.date().min(new Date().toISOString().slice(0, 10)).required(),
  to: Joi.date().min(Joi.ref('from')).required(),
});

export {reserveCreateValidator, reserveUpdateValidator};
