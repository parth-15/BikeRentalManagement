import {Router} from 'express';

import isAuthenticated from '../middlewares/auth.middleware';
import bikeReportController from '../controllers/bikeReport.controller';

const bikeReportRouter = Router();

bikeReportRouter
  .route('/')
  .get(isAuthenticated, bikeReportController.getUserDetailsOfAllBike);

bikeReportRouter
  .route('/:bikeId')
  .get(isAuthenticated, bikeReportController.getUserDetailsOfBike);

export default bikeReportRouter;
