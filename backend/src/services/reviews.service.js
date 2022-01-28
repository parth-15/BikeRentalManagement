import Review from '../models/review.model';

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
    return updatedReview.id;
  }

  async deleteById(reviewId) {
    await Review.findByIdAndDelete(reviewId);
    return reviewId;
  }
}

export default new ReviewsService();
