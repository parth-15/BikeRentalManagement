import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const seedManager = async () => {
  const managerUsername = process.env.DEFAULT_MANAGER_USERNAME;
  const managerPassword = process.env.DEFAULT_MANAGER_PASSWORD;

  const manager = await User.findOne({username: managerUsername});
  if (!manager) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const passwordHash = await bcrypt.hash(managerPassword, saltRounds);
    await User.create({
      username: managerUsername,
      password: passwordHash,
      role: 'manager',
    });
  }
};

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const applyDatabaseSetup = async () => {
  await connectDb();
  await seedManager();
};

export default applyDatabaseSetup;
