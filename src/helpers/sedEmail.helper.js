const nodemailer = require("nodemailer");
const config = require("../config/config");
const ServiceError = require("../utils/errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.development.email.company_email,
    pass: config.development.email.company_password_email,
  },
});

const createMail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: config.development.email.company_name,
      to,
      subject,
      text,
      html,
    });
  } catch (e) {
    throw new ServiceError(
      "Error sending email",
      ErrorCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = createMail;
