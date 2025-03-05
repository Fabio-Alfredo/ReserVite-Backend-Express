/**
 * @param {Object} res - response object
 * @param {number} status - status code
 * @param {string} message - message to be returned
 * @param {Object} data - data to be returned
 * @returns {Object} - response object
 */
const responseHandler = (res, status, message, data = {}) => {
  return res.status(status || 200).json({
    success: true,
    message: message || 'Success',
    data: data,
  });
};

module.exports = responseHandler;
