import mongoose from 'mongoose';

function isValidMongooseObjectId(id) {
  if (!mongoose.isValidObjectId(id)) {
    return false;
  }
  return true;
}

export default isValidMongooseObjectId;
