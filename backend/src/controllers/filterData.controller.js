import filterDataService from '../services/filterData.service';

class FilterDataController {
  async getFilterData(req, res) {
    try {
      const filterObj = await filterDataService.getFilterData();
      res.status(201).json({success: true, data: filterObj});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new FilterDataController();
