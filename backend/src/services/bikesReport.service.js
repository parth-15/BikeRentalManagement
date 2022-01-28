import Reserve from '../models/reserve.model';

class BikesReportService {
  async listAll(page, perPage) {
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

  async list(bikeId, page, perPage) {
    let reserves;
    let count = 0;
    count = await Reserve.countDocuments({bike: bikeId});
    await Reserve.paginate(
      {bike: bikeId},
      {page: page + 1, limit: perPage},
    ).then(result => {
      reserves = result.docs;
    });

    return {
      count,
      page,
      perPage,
      rows: reserves,
    };
  }
}

export default new BikesReportService();
