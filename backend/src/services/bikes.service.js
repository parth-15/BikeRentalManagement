import Bike from '../models/bike.model';

class BikesService {
  async list(page, perPage, model, color, location, rating) {
    let bikes;
    let count = 0;
    const filterObj = {model, color, location};
    count = await Bike.countDocuments({
      ...filterObj,
      rating: {
        $gte: rating,
      },
    });

    await Bike.paginate(
      {
        ...filterObj,
        rating: {
          $gte: rating,
        },
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

  async deleteById(bikeId) {
    await Bike.findByIdAndDelete(bikeId);
    return bikeId;
  }
}

export default new BikesService();
