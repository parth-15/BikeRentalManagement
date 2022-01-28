import {Router} from 'express';

import authRouter from './auth.router';
import bikeRouter from './bike.router';
import reviewRouter from './review.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/bike', bikeRouter);
reviewRouter.use('/review', reviewRouter);

export default router;
