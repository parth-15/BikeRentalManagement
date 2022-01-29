import {Router} from 'express';

import reserveController from '../controllers/reserve.controller';
import useValidator from '../middlewares/validator.middleware';
import {
  reserveCreateValidator,
  reserveUpdateValidator,
} from '../validators/reserve.validator';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';
import {CREATE, DELETE, READ, RESERVE, UPDATE} from '../utils/constants';

const reserveRouter = Router();

reserveRouter
  .route('/')
  .get(
    isAuthenticated,
    hasPermission(READ, RESERVE),
    reserveController.listReserves,
  )
  .post(
    isAuthenticated,
    hasPermission(CREATE, RESERVE),
    useValidator(reserveCreateValidator),
    reserveController.createReserve,
  );

reserveRouter
  .route('/:reserveId')
  .get(
    isAuthenticated,
    hasPermission(READ, RESERVE),
    reserveController.getReserveById,
  )
  .put(
    isAuthenticated,
    hasPermission(UPDATE, RESERVE),
    useValidator(reserveUpdateValidator),
    reserveController.updateReserveById,
  )
  .delete(
    isAuthenticated,
    hasPermission(DELETE, RESERVE),
    reserveController.removeReserve,
  );

export default reserveRouter;
