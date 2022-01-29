import {Router} from 'express';

import reviewController from '../controllers/review.controller';
import useValidator from '../middlewares/validator.middleware';
import {
  reviewCreateValidator,
  reviewUpdateValidator,
} from '../validators/review.validator';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';
import {CREATE, DELETE, READ, REVIEW, UPDATE} from '../utils/constants';

const reviewRouter = Router();

reviewRouter
  .route('/')
  .get(
    isAuthenticated,
    hasPermission(READ, REVIEW),
    reviewController.listReviews,
  )
  .post(
    isAuthenticated,
    hasPermission(CREATE, REVIEW),
    useValidator(reviewCreateValidator),
    reviewController.createReview,
  );

reviewRouter
  .route('/:reviewId')
  .get(
    isAuthenticated,
    hasPermission(READ, REVIEW),
    reviewController.getReviewById,
  )
  .put(
    isAuthenticated,
    hasPermission(UPDATE, REVIEW),
    useValidator(reviewUpdateValidator),
    reviewController.updateReviewById,
  )
  .delete(
    isAuthenticated,
    hasPermission(DELETE, REVIEW),
    reviewController.removeReview,
  );

export default reviewRouter;
