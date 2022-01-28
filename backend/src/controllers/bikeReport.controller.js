import bikesReportService from '../services/bikesReport.service';

class BikeReportController {
  async getUserDetailsOfBike(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const reserves = await bikesReportService.list(
        req.params.bikeId,
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

  async getUserDetailsOfAllBike(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const reserves = await bikesReportService.listAll(page, 10);

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

export default new BikeReportController();
