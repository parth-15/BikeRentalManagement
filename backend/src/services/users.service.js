import mongoose from 'mongoose';
import User from '../models/user.model';

class UsersService {
  async list(page, perPage) {
    let users;
    let count = 0;
    count = await User.countDocuments({});

    await User.paginate({}, {page: page + 1, limit: perPage}).then(result => {
      users = result.docs;
    });

    return {
      count,
      page,
      perPage,
      rows: users,
    };
  }

  async findById(id) {
    if (!mongoose.isValidObjectId(id)) {
      return null;
    }
    const user = await User.findById(id);
    return user;
  }

  async findByUsername(username) {
    const user = await User.findOne({username});
    return user;
  }

  async findByUsernameWithPassword(username) {
    const userWithPassword = await User.findOne({username}).select('+password');
    return userWithPassword;
  }

  async create(userData) {
    const user = new User({
      username: userData.username,
      password: userData.password,
      role: userData.role || 'user',
    });
    const savedUser = await user.save();
    return savedUser.id;
  }

  async putById(userId, userData) {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username: userData.username,
        password: userData.password,
        role: userData.role,
      },
      {new: true},
    );
    return updatedUser.id;
  }

  async deleteById(id) {
    await User.findByIdAndDelete(id);
    return id;
  }
}

export default new UsersService();
