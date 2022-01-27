import Joi from 'joi';

const signupValidator = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const loginValidator = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

export {signupValidator, loginValidator};
