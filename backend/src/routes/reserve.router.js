import {Router} from 'express';

import reserveController from '../controllers/reserve.controller';
import useValidator from '../middlewares/validator.middleware';
import {
  reserveCreateValidator,
  reserveUpdateValidator,
} from '../validators/reserve.validator';
import isAuthenticated from '../middlewares/auth.middleware';

const reserveRouter = Router();

reserveRouter
  .route('/')
  .get(isAuthenticated, reserveController.listReserves)
  .post(
    isAuthenticated,
    useValidator(reserveCreateValidator),
    reserveController.createReserve,
  );

reserveRouter
  .route('/:reserveId')
  .get(isAuthenticated, reserveController.getReserveById)
  .put(
    isAuthenticated,
    useValidator(reserveUpdateValidator),
    reserveController.updateReserveById,
  )
  .delete(isAuthenticated, reserveController.removeReserve);

export default reserveRouter;
