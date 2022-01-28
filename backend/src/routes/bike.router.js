import {Router} from 'express';

import bikeController from '../controllers/bike.controller';
import useValidator from '../middlewares/validator.middleware';
import {
  bikeCreateValidator,
  bikeUpdateValidator,
} from '../validators/bike.validator';
import isAuthenticated from '../middlewares/auth.middleware';

const bikeRouter = Router();

bikeRouter
  .route('/')
  .get(isAuthenticated, bikeController.listBikes)
  .post(
    isAuthenticated,
    useValidator(bikeCreateValidator),
    bikeController.createBike,
  );

bikeRouter
  .route('/:bikeId')
  .get(isAuthenticated, bikeController.getBikeById)
  .put(
    isAuthenticated,
    useValidator(bikeUpdateValidator),
    bikeController.updateBikeById,
  )
  .delete(isAuthenticated, bikeController.removeBike);

export default bikeRouter;
