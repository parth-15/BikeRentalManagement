/* eslint-disable dot-notation */
import mongoose from 'mongoose';

import Bike from '../models/bike.model';
import Reserve from '../models/reserve.model';

class BikesService {
  //FIXME: check following function properly
  async list(
    page,
    perPage,
    model,
    color,
    location,
    rating,
    startDate,
    endDate,
  ) {
    let bikes;
    let count = 0;
    const filterObj = {};
    if (model) {
      filterObj['model'] = model;
    }
    if (color) {
      filterObj['color'] = color;
    }
    if (location) {
      filterObj['location'] = location;
    }
    const overlappingBikes = await Reserve.find({
      from: {$lte: endDate},
      to: {$gte: startDate},
    }).select('bike');
    console.log(overlappingBikes);
    count = await Bike.countDocuments({
      ...filterObj,
      rating: {
        $gte: rating,
      },
      _id: {$nin: overlappingBikes},
    });

    await Bike.paginate(
      {
        ...filterObj,
        rating: {
          $gte: rating,
        },
        _id: {$nin: overlappingBikes},
      },
      {page: page + 1, limit: perPage},
    ).then(result => {
      bikes = result.docs;
    });

    return {
      count,
      page,
      perPage,
      rows: bikes,
    };
  }

  async findById(bikeId) {
    if (!mongoose.isValidObjectId(bikeId)) {
      return null;
    }
    const bike = await Bike.findById(bikeId);
    return bike;
  }

  async create(bikeData) {
    const bike = new Bike({
      model: bikeData.model,
      color: bikeData.color,
      location: bikeData.location,
    });
    const savedBike = await bike.save();
    return savedBike.id;
  }

  async putById(bikeId, bikeData) {
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      {
        model: bikeData.model,
        color: bikeData.color,
        location: bikeData.location,
        available: bikeData.available,
      },
      {new: true},
    );
    return updatedBike.id;
  }

  async updateBikeRating(bikeId, rating) {
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      {
        rating: rating,
      },
      {new: true},
    );
    return updatedBike.id;
  }

  async deleteById(bikeId) {
    await Bike.findByIdAndDelete(bikeId);
    return bikeId;
  }
}

export default new BikesService();
