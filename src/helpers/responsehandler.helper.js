const responseHandler = (res, status, message, data = {}) => {
  return res.status(status || 200).json({
    message: message || "Success",
    data: data ,
  });
};

module.exports = responseHandler;
