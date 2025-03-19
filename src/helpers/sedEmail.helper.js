const nodemailer = require("nodemailer");
const config = require("../config/config");
const ServiceError = require("../utils/errors/service.error");
const ErrorCodes = require("../utils/errors/error.codes");
const createEmailTemplate = require("../utils/templates/emailTemplate.util");
const path = require("path");

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
 * Envia un correo basado en una plantilla predefinida.
 * @param {string} to - Destinatario del correo.
 * @param {string} type - Tipo de correo (ej. "passwordRecovery", "purchaseConfirmation").
 * @param {object} data - Datos necesarios para generar el correo.
 */
const sendMail = async (to, type, data) => {
  try {
    console.log("Sending email to: ", to);
    const template = createEmailTemplate(type, data);

    const mailOptions = {
      from: config.email.company_name,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    // Si hay un archivo adjunto, lo agregamos
    if (template.attachmentPath) {
      mailOptions.attachments = [
        {
          filename: path.basename(template.attachmentPath),
          path: template.attachmentPath,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw new ServiceError(
      e.message || "Error sending email",
      e.code || ErrorCodes.SERVER.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = sendMail;
