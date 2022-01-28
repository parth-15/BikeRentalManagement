const resources = {
  user: {
    create: ['manager'],
    read: ['manager'],
    update: ['manager'],
    delete: ['manager'],
  },
  bike: {
    create: ['manager'],
    read: ['manager', 'user'],
    update: ['manager'],
    delete: ['manager'],
  },
  review: {
    create: ['manager', 'user'],
    read: ['manager', 'user'],
    update: ['manager'],
    delete: ['manager'],
  },
  reserve: {
    create: ['manager', 'user'],
  },
  report: {
    read: ['manager'],
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
