import usersReportService from '../services/usersReport.service';

class UserReportController {
  async getBikeDetailsOfUser(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const reserves = await usersReportService.list(
        req.params.userId,
        page,
        10,
      );

      res.status(200).json({
        success: true,
        data: reserves,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async getBikeDetailsOfAllUser(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const reserves = await usersReportService.listAll(page, 10);

      res.status(200).json({
        success: true,
        data: reserves,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new UserReportController();
