/**
 * Error handler middleware
 * @param {Object} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Object} - Error response
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(err.status || 500).json({
    error: {
      message: err.message || 'Something went wrong',
    },
  });
};

module.exports = errorHandler;
