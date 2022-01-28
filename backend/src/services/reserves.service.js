import mongoose from 'mongoose';

import Reserve from '../models/reserve.model';

class ReserveService {
  async list(page, perPage) {
    let reserves;
    let count = 0;
    count = await Reserve.countDocuments({});

    await Reserve.paginate({}, {page: page + 1, limit: perPage}).then(
      result => {
        reserves = result.docs;
      },
    );

    return {
      count,
      page,
      perPage,
      rows: reserves,
    };
  }

  async getReserveOfUserAndBike(userId, bikeId) {
    const reserves = await Reserve.find({user: userId, bike: bikeId}).select(
      'from',
    );
    console.log(reserves);
    return reserves;
  }

  async findById(reserveId) {
    if (!mongoose.isValidObjectId(reserveId)) {
      return null;
    }
    const reserve = await Reserve.findById(reserveId);
    return reserve;
  }

  async create(reserveData) {
    const reserve = new Reserve({
      user: reserveData.user,
      bike: reserveData.bike,
      from: reserveData.from,
      to: reserveData.to,
    });
    const savedReserve = await reserve.save();
    return savedReserve.id;
  }

  async putById(reserveId, reserveData) {
    const updatedReserve = await Reserve.findByIdAndUpdate(
      reserveId,
      {
        user: reserveData.user,
        bike: reserveData.bike,
        from: reserveData.from,
        to: reserveData.to,
      },
      {new: true},
    );
    return updatedReserve.id;
  }

  async isBikeReserved(bikeId, startDate, endDate) {
    console.log(bikeId);
    const overlappingBikes = await Reserve.find({
      bike: bikeId,
      from: {$lte: endDate},
      to: {$gte: startDate},
    }).select('bike');
    console.log(overlappingBikes);
    return overlappingBikes.length > 0;
  }

  async deleteById(reserveId) {
    await Reserve.findByIdAndDelete(reserveId);
    return reserveId;
  }
}

export default new ReserveService();
