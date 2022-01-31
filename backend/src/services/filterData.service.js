import bikesService from './bikes.service';

class FilterDataService {
  async getFilterData() {
    const bikes = await bikesService.listAllBikes();
    const models = [];
    const colors = [];
    const locations = [];
    bikes.map(bike => {
      models.push(bike.model);
      colors.push(bike.color);
      locations.push(bike.location);
      return null;
    });
    const filterObj = {
      models: [...new Set(models)],
      colors: [...new Set(colors)],
      locations: [...new Set(locations)],
    };
    return filterObj;
  }
}

export default new FilterDataService();
