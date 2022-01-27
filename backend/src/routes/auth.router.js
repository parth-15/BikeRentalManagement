import {Router} from 'express';

import authController from '../controllers/auth.controller';
import {loginValidator, signupValidator} from '../validators/auth.validator';
import useValidator from '../middlewares/validator.middleware';
import isAuthenticated from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post(
  '/signup',
  useValidator(signupValidator),
  authController.signup,
);

authRouter.post(
  '/manager',
  useValidator(signupValidator),
  isAuthenticated,
  authController.createManager,
);

authRouter.post('/login', useValidator(loginValidator), authController.login);

authRouter.get('/', isAuthenticated, authController.me);

export default authRouter;
