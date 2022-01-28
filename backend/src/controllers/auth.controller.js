import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import usersService from '../services/users.service';
import {MANAGER} from '../utils/constants';
import generatePassword from '../utils/randomGenerator';

class AuthController {
  async signup(req, res) {
    try {
      const userByUsername = await usersService.findByUsername(
        req.body.username,
      );
      if (userByUsername) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this username',
        });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
      const password = generatePassword(8);
      req.body.password = await bcrypt.hash(
        req.body.password || password,
        saltRounds,
      );
      await usersService.create({
        ...req.body,
        role: req.body.role || 'user',
      });

      const jwtSecret = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          username: req.body.username,
        },
        jwtSecret,
      );

      res.status(201).json({success: true, token});
    } catch (err) {
      console.error(err);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async login(req, res) {
    try {
      // Fetch user with password for comparison
      const userByUsername = await usersService.findByUsernameWithPassword(
        req.body.username,
      );

      if (!userByUsername) {
        return res
          .status(401)
          .json({success: false, error: 'Authentication failed'});
      }

      // Check if the password match with the hash
      const match = await bcrypt.compare(
        req.body.password,
        userByUsername.password,
      );

      if (!match) {
        return res
          .status(401)
          .json({success: false, error: 'Authentication failed'});
      }

      const jwtSecret = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          username: req.body.username,
        },
        jwtSecret,
      );

      res.status(200).json({success: true, token});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async createManager(req, res) {
    try {
      if (req.user.role !== MANAGER) {
        return res.status(400).json({
          success: false,
          error: 'Only Manager can create other manager',
        });
      }
      const managerByUsername = await usersService.findByUsername(
        req.body.username,
      );
      if (managerByUsername) {
        return res.status(400).json({
          success: false,
          error: 'Manager already exists with this username',
        });
      }
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
      const password = generatePassword(8);
      req.body.password = await bcrypt.hash(
        req.body.password || password,
        saltRounds,
      );
      await usersService.create({
        ...req.body,
        role: MANAGER,
      });

      const jwtSecret = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          username: req.body.username,
        },
        jwtSecret,
      );

      res.status(201).json({success: true, token});
    } catch (err) {
      console.error(err);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async me(req, res) {
    try {
      res.status(200).json({success: true, user: req.user});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new AuthController();
