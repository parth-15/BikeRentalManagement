import bikesService from '../services/bikes.service';

class BikeController {
  async listBikes(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;
      const {model, color, location, startdate, enddate} = req.query;
      const rating = parseInt(req.query.rating, 10) || 0;
      const bikes = await bikesService.list(
        page,
        10,
        model,
        color,
        location,
        rating,
        startdate,
        enddate,
      );
      res.status(200).json({
        success: true,
        data: bikes,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async getBikeById(req, res) {
    try {
      const bike = await bikesService.findById(req.params.bikeId);

      if (!bike) {
        return res.status(404).json({success: false, error: 'Bike not found'});
      }

      res.status(200).json({success: true, data: bike});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async createBike(req, res) {
    try {
      const bikeId = await bikesService.create(req.body);
      res.status(201).json({success: true, data: {id: bikeId}});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async updateBikeById(req, res) {
    try {
      const bike = await bikesService.findById(req.params.bikeId);
      if (!bike) {
        return res.status(404).json({success: false, error: 'Bike not found'});
      }
      await bikesService.putById(req.params.bikeId, req.body);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async removeBike(req, res) {
    try {
      const bike = await bikesService.findById(req.params.bikeId);

      if (!bike) {
        return res.status(404).json({success: false, error: 'Bike not found'});
      }

      await bikesService.deleteById(req.params.bikeId);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new BikeController();
