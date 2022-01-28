import Joi from 'joi';

const reviewCreateValidator = Joi.object({
  rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
  user: Joi.string().required(),
  bike: Joi.string().required(),
});

const reviewUpdateValidator = Joi.object({
  rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
  user: Joi.string().required(),
  bike: Joi.string().required(),
});

export {reviewCreateValidator, reviewUpdateValidator};
