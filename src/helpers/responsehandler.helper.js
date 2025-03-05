const responseHandler = (res, status, message, data = {}) => {
  return res.status(status || 200).json({
    success: true,
    message: message || "Success",
    data: data,
  });
};

module.exports = responseHandler;
