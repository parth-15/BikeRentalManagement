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

  async findById(reserveId) {
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

  async deleteById(reserveId) {
    await Reserve.findByIdAndDelete(reserveId);
    return reserveId;
  }
}

export default new ReserveService();
