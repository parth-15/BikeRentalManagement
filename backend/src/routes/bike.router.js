import {Router} from 'express';

import bikeController from '../controllers/bike.controller';
import useValidator from '../middlewares/validator.middleware';
import {
  bikeCreateValidator,
  bikeUpdateValidator,
} from '../validators/bike.validator';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';
import {BIKE, CREATE, DELETE, READ, UPDATE} from '../utils/constants';

const bikeRouter = Router();

bikeRouter
  .route('/')
  .get(isAuthenticated, hasPermission(READ, BIKE), bikeController.listBikes)
  .post(
    isAuthenticated,
    hasPermission(CREATE, BIKE),
    useValidator(bikeCreateValidator),
    bikeController.createBike,
  );

bikeRouter
  .route('/:bikeId')
  .get(isAuthenticated, hasPermission(READ, BIKE), bikeController.getBikeById)
  .put(
    isAuthenticated,
    hasPermission(UPDATE, BIKE),
    useValidator(bikeUpdateValidator),
    bikeController.updateBikeById,
  )
  .delete(
    isAuthenticated,
    hasPermission(DELETE, BIKE),
    bikeController.removeBike,
  );

export default bikeRouter;
