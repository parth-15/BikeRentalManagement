import {Router} from 'express';

import isAuthenticated from '../middlewares/auth.middleware';
import bikeReportController from '../controllers/bikeReport.controller';
import hasPermission from '../middlewares/permission.middleware';
import {BIKEREPORT, READ} from '../utils/constants';

const bikeReportRouter = Router();

bikeReportRouter
  .route('/')
  .get(
    isAuthenticated,
    hasPermission(READ, BIKEREPORT),
    bikeReportController.getUserDetailsOfAllBike,
  );

bikeReportRouter
  .route('/:bikeId')
  .get(
    isAuthenticated,
    hasPermission(READ, BIKEREPORT),
    bikeReportController.getUserDetailsOfBike,
  );

export default bikeReportRouter;
