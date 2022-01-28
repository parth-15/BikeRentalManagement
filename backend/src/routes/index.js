import {Router} from 'express';

import authRouter from './auth.router';
import bikeRouter from './bike.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/bike', bikeRouter);

export default router;
