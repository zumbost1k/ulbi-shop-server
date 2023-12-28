const ApiError = require('../error/apiError');

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ mesage: err.mesage });
  }
  return res.status(500).json({ message: 'unexpected error' });
};
