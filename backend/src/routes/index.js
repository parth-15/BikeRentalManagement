import {Router} from 'express';

import authRouter from './auth.router';
import bikeRouter from './bike.router';
import reviewRouter from './review.router';
import reserveRouter from './reserve.router';
import userRouter from './user.router';
import userReportRouter from './userReport.router';
import bikeReportRouter from './bikeReport.router';
import filterDataRouter from './filterData.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/bike', bikeRouter);
router.use('/review', reviewRouter);
router.use('/reserve', reserveRouter);
router.use('/user', userRouter);
router.use('/userReport', userReportRouter);
router.use('/bikeReport', bikeReportRouter);
router.use('/filterData', filterDataRouter);

export default router;
