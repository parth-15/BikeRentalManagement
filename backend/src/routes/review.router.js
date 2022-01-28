import {Router} from 'express';

import reviewController from '../controllers/review.controller';
import useValidator from '../middlewares/validator.middleware';
import {
  reviewCreateValidator,
  reviewUpdateValidator,
} from '../validators/review.validator';
import isAuthenticated from '../middlewares/auth.middleware';

const reviewRouter = Router();

reviewRouter
  .route('/')
  .get(isAuthenticated, reviewController.listReviews)
  .post(
    isAuthenticated,
    useValidator(reviewCreateValidator),
    reviewController.createReview,
  );

reviewRouter
  .route('/:reviewId')
  .get(isAuthenticated, reviewController.getReviewById)
  .put(
    isAuthenticated,
    useValidator(reviewUpdateValidator),
    reviewController.updateReviewById,
  )
  .delete(isAuthenticated, reviewController.removeReview);

export default reviewRouter;
