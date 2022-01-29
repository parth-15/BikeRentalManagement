import {Router} from 'express';

import isAuthenticated from '../middlewares/auth.middleware';
import userReportController from '../controllers/userReport.controller';
import hasPermission from '../middlewares/permission.middleware';
import {READ, USERREPORT} from '../utils/constants';

const userReportRouter = Router();

userReportRouter
  .route('/')
  .get(
    isAuthenticated,
    hasPermission(READ, USERREPORT),
    userReportController.getBikeDetailsOfAllUser,
  );

userReportRouter
  .route('/:userId')
  .get(
    isAuthenticated,
    hasPermission(READ, USERREPORT),
    userReportController.getBikeDetailsOfUser,
  );

export default userReportRouter;
