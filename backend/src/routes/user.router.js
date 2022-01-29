import {Router} from 'express';

import usersController from '../controllers/user.controller';
import {
  userCreateValidator,
  userUpdateValidator,
} from '../validators/user.validator';
import useValidator from '../middlewares/validator.middleware';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';
import {CREATE, DELETE, READ, UPDATE, USER} from '../utils/constants';

const userRouter = Router();

userRouter
  .route('/')
  .get(isAuthenticated, hasPermission(READ, USER), usersController.listUsers)
  .post(
    isAuthenticated,
    hasPermission(CREATE, USER),
    useValidator(userCreateValidator),
    usersController.createUser,
  );

userRouter
  .route('/:userId')
  .get(isAuthenticated, hasPermission(READ, USER), usersController.getUserById)
  .put(
    isAuthenticated,
    hasPermission(UPDATE, USER),
    useValidator(userUpdateValidator),
    usersController.updateUserById,
  )
  .delete(
    isAuthenticated,
    hasPermission(DELETE, USER),
    usersController.removeUser,
  );

export default userRouter;
