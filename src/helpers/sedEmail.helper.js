const nodemailer = require("nodemailer");
const config = require("../config/config");
const ServiceError = require("../utils/errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");

/**
 * Configuración del servicio de correo
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.company_email,
    pass: config.email.company_password_email,
  },
});

/**
 * Crea un correo electrónico
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} text - Texto del correo
 * @param {string} html - HTML del correo
 */
const createMail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: config.email.company_name,
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
