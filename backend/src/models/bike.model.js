/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const bikeSchema = new mongoose.Schema(
  {
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    location: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true},
);

bikeSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

bikeSchema.plugin(mongoosePaginate);

const Bike = mongoose.model('Bike', bikeSchema);

export default Bike;
