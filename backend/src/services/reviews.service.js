import mongoose from 'mongoose';

import Review from '../models/review.model';
import bikesService from './bikes.service';

class ReviewsService {
  async list(page, perPage) {
    let reviews;
    let count = 0;
    count = await Review.countDocuments({});

    await Review.paginate({}, {page: page + 1, limit: perPage}).then(result => {
      reviews = result.docs;
    });

    return {
      count,
      page,
      perPage,
      rows: reviews,
    };
  }

  async findById(reviewId) {
    if (!mongoose.isValidObjectId(reviewId)) {
      return null;
    }
    const review = await Review.findById(reviewId);
    return review;
  }

  async findByUserAndBike(userId, bikeId) {
    const review = await Review.findOne({user: userId, bike: bikeId}).populate([
      'user',
      'bike',
    ]);
    return review;
  }

  async create(reviewData) {
    const review = new Review({
      user: reviewData.user,
      bike: reviewData.bike,
      rating: reviewData.rating,
    });
    const savedReview = await review.save();
    const entries = await Review.aggregate([
      {
        $match: {
          bike: {
            $eq: new mongoose.Types.ObjectId(reviewData.bike),
          },
        },
      },
      {
        $group: {
          _id: '$bike',
          avg: {
            $avg: '$rating',
          },
        },
      },
    ]);
    await bikesService.updateBikeRating(reviewData.bike, entries[0].avg);
    return savedReview.id;
  }

  async putById(reviewId, reviewData) {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        user: reviewData.user,
        bike: reviewData.bike,
        rating: reviewData.rating,
      },
      {new: true},
    );
    const entries = await Review.aggregate([
      {
        $match: {
          bike: {
            $eq: new mongoose.Types.ObjectId(reviewData.bike),
          },
        },
      },
      {
        $group: {
          _id: '$bike',
          avg: {
            $avg: '$rating',
          },
        },
      },
    ]);
    await bikesService.updateBikeRating(reviewData.bike, entries[0].avg);
    return updatedReview.id;
  }

  async deleteById(reviewId) {
    await Review.findByIdAndDelete(reviewId);
    const reviewData = await this.findById(reviewId);
    const entries = await Review.aggregate([
      {
        $match: {
          bike: {
            $eq: new mongoose.Types.ObjectId(reviewData.bike),
          },
        },
      },
      {
        $group: {
          _id: '$bike',
          avg: {
            $avg: '$rating',
          },
        },
      },
    ]);
    await bikesService.updateBikeRating(reviewData.bike, entries[0].avg);
    return reviewId;
  }
}

export default new ReviewsService();
