import Reserve from '../models/reserve.model';

class UsersReportService {
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

  async list(userId, page, perPage) {
    let reserves;
    let count = 0;
    count = await Reserve.countDocuments({user: userId});
    await Reserve.paginate(
      {user: userId},
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

export default new UsersReportService();
