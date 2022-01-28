import bcrypt from 'bcrypt';

import usersService from '../services/users.service';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

class UserController {
  async listUsers(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const users = await usersService.list(page, 10);

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async getUserById(req, res) {
    try {
      const user = await usersService.findById(req.params.userId);
      if (!user) {
        return res
          .status(404)
          .json({success: false, error: 'User does not exist'});
      }

      res.status(200).json({success: true, data: user});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async createUser(req, res) {
    try {
      if (req.body.role === 'manager' && req.user.role !== 'manager') {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
      const userByUsername = await usersService.findByUsername(
        req.body.username,
      );

      if (userByUsername) {
        return res.status(400).json({
          success: false,
          error: 'User with this username already exist',
        });
      }

      req.body.password = await bcrypt.hash(req.body.password, saltRounds);

      const userId = await usersService.create(req.body);
      res.status(201).json({success: true, data: {id: userId}});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async updateUserById(req, res) {
    try {
      const user = await usersService.findById(req.params.userId);

      if (!user) {
        return res
          .status(404)
          .json({success: false, error: 'User does not exist'});
      }

      const userByUsername = await usersService.findByUsername(
        req.body.username,
      );
      if (userByUsername && userByUsername.id !== req.params.userId) {
        return res.status(400).json({
          success: false,
          error: 'User already exists with this username',
        });
      }

      if (req.body.password != null) {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }

      await usersService.putById(req.params.userId, req.body);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async removeUser(req, res) {
    try {
      const user = await usersService.findById(req.params.userId);

      if (!user) {
        return res
          .status(404)
          .json({success: false, error: 'User does not exist'});
      }

      await usersService.deleteById(req.params.userId);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new UserController();
