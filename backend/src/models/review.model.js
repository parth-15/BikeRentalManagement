/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
    },
    rating: {
      type: Number,
    },
  },
  {timestamps: true},
);

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

reviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
