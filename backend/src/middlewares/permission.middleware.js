import {MANAGER, USER} from '../utils/constants';

const resources = {
  user: {
    create: [MANAGER],
    read: [MANAGER],
    update: [MANAGER],
    delete: [MANAGER],
  },
  bike: {
    create: [MANAGER],
    read: [MANAGER, USER],
    update: [MANAGER],
    delete: [MANAGER],
  },
  review: {
    create: [MANAGER, USER],
    read: [MANAGER],
    update: [],
    delete: [],
  },
  reserve: {
    create: [MANAGER, USER],
    read: [MANAGER, USER],
    update: [],
    delete: [MANAGER, USER],
  },
  userReport: {
    read: [MANAGER],
  },
  bikeReport: {
    read: [MANAGER],
  },
  filterData: {
    read: [MANAGER, USER],
  },
};

function hasPermission(action, resource) {
  return async (req, res, next) => {
    try {
      const {role} = req.user;
      if (resources[resource][action].includes(role)) {
        next();
      } else {
        return res.status(403).json({
          success: false,
          error: 'Not authorised.',
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(403).json({
        success: false,
        error: 'Not authorised.',
      });
    }
  };
}

export default hasPermission;
