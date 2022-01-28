/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const reserveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  },
  {timestamps: true},
);

reserveSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

reserveSchema.plugin(mongoosePaginate);

const Reserve = mongoose.model('Reserve', reserveSchema);

export default Reserve;
