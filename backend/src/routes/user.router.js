import {Router} from 'express';

import usersController from '../controllers/user.controller';
import {
  userCreateValidator,
  userUpdateValidator,
} from '../validators/user.validator';
import useValidator from '../middlewares/validator.middleware';
// import { hasPermission } from "../middlewares/permission.middleware";
import isAuthenticated from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter
  .route('/')
  .get(isAuthenticated, usersController.listUsers)
  .post(
    isAuthenticated,
    useValidator(userCreateValidator),
    usersController.createUser,
  );

userRouter
  .route('/:userId')
  .get(isAuthenticated, usersController.getUserById)
  .put(
    isAuthenticated,
    useValidator(userUpdateValidator),
    usersController.updateUserById,
  )
  .delete(isAuthenticated, usersController.removeUser);

export default userRouter;
