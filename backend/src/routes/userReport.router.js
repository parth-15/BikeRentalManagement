import {Router} from 'express';

import isAuthenticated from '../middlewares/auth.middleware';
import userReportController from '../controllers/userReport.controller';

const userReportRouter = Router();

userReportRouter
  .route('/')
  .get(isAuthenticated, userReportController.getBikeDetailsOfAllUser);

userReportRouter
  .route('/:userId')
  .get(isAuthenticated, userReportController.getBikeDetailsOfUser);

export default userReportRouter;
