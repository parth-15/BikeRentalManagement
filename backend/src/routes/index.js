import {Router} from 'express';

import authRouter from './auth.router';
import bikeRouter from './bike.router';
import reviewRouter from './review.router';
import reserveRouter from './reserve.router';
import userRouter from './user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/bike', bikeRouter);
router.use('/review', reviewRouter);
router.use('/reserve', reserveRouter);
router.use('/user', userRouter);

export default router;
