const { validationResult } = require("express-validator");

const validatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((e) => {
      return { path: e.path, message: e.msg };
    });
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errorMessages,
    });
  }
  next();
};

module.exports = validatorHandler;
