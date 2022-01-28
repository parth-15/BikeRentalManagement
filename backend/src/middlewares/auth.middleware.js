import jwt from 'jsonwebtoken';
import usersService from '../services/users.service';
import {AUTHORIZATION, BEARER} from '../utils/constants';

async function isAuthenticated(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  if (req.headers[AUTHORIZATION]) {
    try {
      const authorization = req.headers[AUTHORIZATION].split(' ');
      if (authorization[0] !== BEARER) {
        return res.status(401).json({success: false, error: 'Unauthenticated'});
        // eslint-disable-next-line no-else-return
      } else {
        req.jwt = jwt.verify(authorization[1], jwtSecret);
        req.user = await usersService.findByUsername(req.jwt.username);
        if (!req.user) {
          return res.status(403).json({success: false, error: 'Unauthorised'});
        }
        return next();
      }
    } catch (err) {
      console.error(err);
      return res.status(403).json({success: false, error: 'Unauthorised'});
    }
  } else {
    return res.status(401).json({success: false, error: 'Unauthenticated'});
  }
}

export default isAuthenticated;
