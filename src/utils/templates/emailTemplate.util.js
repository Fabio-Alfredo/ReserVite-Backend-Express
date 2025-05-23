/**
 * Función que crea un objeto con la estructura de un correo electrónico
 *
 * @param {string} type - Tipo de correo
 * @param {Object} data - Datos del correo
 * @returns {Object} - Objeto con la estructura de un correo electrónico
 */
const createEmailTemplate = (type, data) => {
  switch (type) {
    case "passwordRecovery":
      return {
        subject: "🔑 Recuperación de Contraseña",
        text: `Hola, haz clic en el siguiente enlace para recuperar tu contraseña: ${data.recoveryLink}`,
        html: `<p>Hola,</p><p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p><a href="${data.recoveryLink}">${data.recoveryLink}</a>`,
      };

    case "paymentConfirmation":
      return {
        subject: "🎟 Confirmación de Compra",
        text: "Adjunto encontrarás tu entrada en formato PDF.",
        html: `<p>Gracias por tu compra. Adjuntamos tu entrada en PDF.</p>`,
        attachmentPath: data, // Si hay un archivo, lo añadimos
      };

    case "welcome":
      return {
        subject: "👋 ¡Bienvenido a nuestra plataforma!",
        text: `Hola ${data.username}, gracias por registrarte.`,
        html: `<h1>Bienvenido, ${data.username}!</h1><p>Estamos felices de tenerte aquí.</p>`,
      };

    default:
      throw new Error("Tipo de correo no válido");
  }
};

module.exports = createEmailTemplate;
