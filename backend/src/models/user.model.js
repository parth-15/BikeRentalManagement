/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {timestamps: true},
);

userSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

export default User;
