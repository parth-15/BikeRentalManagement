import bikesService from '../services/bikes.service';
import reviewsService from '../services/reviews.service';
import usersService from '../services/users.service';
import reservesService from '../services/reserves.service';

class ReviewController {
  async listReviews(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const reviews = await reviewsService.list(page, 10);
      res.status(200).json({success: true, data: reviews});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await reviewsService.findById(req.params.reviewId);
      if (!review) {
        return res
          .status(404)
          .json({success: false, error: 'Review not found'});
      }

      res.status(200).json({success: true, data: review});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async createReview(req, res) {
    try {
      const userId = req.body.user;
      const bikeId = req.body.bike;

      if (req.user.role !== 'manager' && userId !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }

      const reservedStartTime = (
        await reservesService.getReserveOfUserAndBike(userId, bikeId)
      ).sort((a, b) => a.from.localeCompare(b.from));
      const todayDate = new Date().toISOString().slice(0, 10);
      if (todayDate <= reservedStartTime[0].from) {
        return res
          .status(400)
          .json({success: false, error: 'Have not used the bike yet'});
      }

      // Query in parallel to improve performance
      const [user, bike, reviewByUserAndBike] = await Promise.all([
        usersService.findById(userId),
        bikesService.findById(bikeId),
        reviewsService.findByUserAndBike(userId, bikeId),
      ]);
      if (!user) {
        return res.status(400).json({success: false, error: 'Invalid user ID'});
      }

      if (!bike) {
        return res.status(400).json({success: false, error: 'Invalid bike ID'});
      }

      if (reviewByUserAndBike) {
        return res.status(400).json({
          success: false,
          error: 'User cannot add multiple ratings for a same bike',
        });
      }
      const reviewId = await reviewsService.create(req.body);
      res.status(201).json({success: true, data: {id: reviewId}});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async updateReviewById(req, res) {
    try {
      const userId = req.body.user;
      const bikeId = req.body.bike;

      if (req.user.role !== 'manager' && userId !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }

      const reservedStartTime = (
        await reservesService.getReserveOfUserAndBike(userId, bikeId)
      ).sort((a, b) => a.from.localeCompare(b.from));

      const todayDate = new Date().toISOString().slice(0, 10);
      if (todayDate < reservedStartTime[0].from) {
        return res
          .status(400)
          .json({success: false, error: 'Have not used the bike yet'});
      }

      const review = await reviewsService.findById(req.params.reviewId);

      if (!review) {
        return res
          .status(404)
          .json({success: false, error: 'Review not found'});
      }

      // Query in parallel to improve performance
      const [user, bike, reviewByUserAndBike] = await Promise.all([
        usersService.findById(userId),
        bikesService.findById(bikeId),
        reviewsService.findByUserAndBike(userId, bikeId),
      ]);

      if (!user) {
        return res.status(400).json({success: false, error: 'Invalid user ID'});
      }

      if (!bike) {
        return res.status(400).json({success: false, error: 'Invalid bike ID'});
      }
      if (
        reviewByUserAndBike &&
        reviewByUserAndBike.id !== req.params.reviewId
      ) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Id',
        });
      }

      await reviewsService.putById(req.params.reviewId, req.body);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async removeReview(req, res) {
    try {
      const review = await reviewsService.findById(req.params.reviewId);

      if (!review) {
        return res
          .status(404)
          .json({success: false, error: 'Review not found'});
      }

      await reviewsService.deleteById(req.params.reviewId);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new ReviewController();
