import {Router} from 'express';
import filterDataController from '../controllers/filterData.controller';

import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';
import {FILTERDATA, READ} from '../utils/constants';

const filterDataRouter = Router();

filterDataRouter
  .route('/')
  .get(
    isAuthenticated,
    hasPermission(READ, FILTERDATA),
    filterDataController.getFilterData,
  );

export default filterDataRouter;
