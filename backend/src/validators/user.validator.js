import Joi from 'joi';

export const userCreateValidator = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'manager').required(),
});

export const userUpdateValidator = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'manager').required(),
});
