import mongoose from 'mongoose';

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const applyDatabaseSetup = async () => {
  await connectDb();
};

export default applyDatabaseSetup;
