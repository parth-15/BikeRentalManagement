import reserveService from '../services/reserves.service';

class ReserveController {
  async listReserves(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;

      const reserves = await reserveService.list(page, 10);
      res.status(200).json({success: true, data: reserves});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async getReserveById(req, res) {
    try {
      const reserve = await reserveService.findById(req.params.reserveId);
      if (!reserve) {
        return res
          .status(404)
          .json({success: false, error: 'Reserve not found'});
      }

      res.status(200).json({success: true, data: reserve});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async createReserve(req, res) {
    try {
      const reserveId = await reserveService.create(req.body);
      res.status(201).json({success: true, data: {id: reserveId}});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async updateReserveById(req, res) {
    try {
      const reserve = await reserveService.findById(req.params.reserveId);
      if (!reserve) {
        return res
          .status(404)
          .json({success: false, error: 'Reserve not found'});
      }
      await reserveService.putById(req.params.reserveId, req.body);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async removeReserve(req, res) {
    try {
      const reserve = await reserveService.findById(req.params.reserveId);

      if (!reserve) {
        return res
          .status(404)
          .json({success: false, error: 'Reserve not found'});
      }

      await reserveService.deleteById(req.params.reserveId);
      res.status(204).json({});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }
}

export default new ReserveController();
