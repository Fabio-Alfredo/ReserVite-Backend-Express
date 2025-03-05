const responseHandler = (res, status, message, data) => {
  return res.status(status || 200).json({
    message: message || "Success",
    data: data || null,
  });
};

module.exports = responseHandler;