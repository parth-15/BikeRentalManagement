/* eslint-disable no-underscore-dangle */
import bikesService from '../services/bikes.service';
import reserveService from '../services/reserves.service';
import {MANAGER} from '../utils/constants';
import isValidMongooseObjectId from '../utils/mongoose';

class ReserveController {
  async listReserves(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 0;
      const {user} = req.query;
      const {bike} = req.query;
      const isValidUserId = isValidMongooseObjectId(user);
      const isValidBikeId = isValidMongooseObjectId(bike);
      if ((user && !isValidUserId) || (bike && !isValidBikeId)) {
        return res.status(400).json({success: false, error: 'Not valid id'});
      }
      if (req.user.role !== MANAGER && user !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
      const reserves = await reserveService.list(user, bike, page, 10);
      res.status(200).json({success: true, data: reserves});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async getReserveById(req, res) {
    try {
      const reserve = await reserveService.findById(req.params.reserveId);
      if (reserve.user._id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
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
      const {bike, user, from, to} = req.body;
      if (req.user.role !== MANAGER && user !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
      const isAvailable = (await bikesService.findById(bike)).available;
      if (!isAvailable) {
        return res
          .status(400)
          .json({success: false, error: 'Bike not available'});
      }
      const isReserved = await reserveService.isBikeReserved(bike, from, to);
      if (isReserved) {
        return res
          .status(400)
          .json({success: false, error: 'Bike already reserved'});
      }
      const reserveId = await reserveService.create(req.body);
      res.status(201).json({success: true, data: {id: reserveId}});
    } catch (e) {
      console.error(e);
      res.status(500).json({success: false, error: 'Something went wrong'});
    }
  }

  async updateReserveById(req, res) {
    try {
      const {user} = req.body;
      if (req.user.role !== MANAGER && user !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
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
      const isReserveCompleted = await reserveService.isReservedCompleted(
        req.params.reserveId,
      );
      if (isReserveCompleted) {
        return res
          .status(400)
          .json({success: false, error: 'Reserve period already over'});
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
