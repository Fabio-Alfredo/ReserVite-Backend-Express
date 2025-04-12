const admin = require("../config/firebase/firebase.config");
const bucket = admin.storage().bucket();

/**
 * Sube una imagen directamente desde la memoria a Firebase Storage y devuelve la URL firmada.
 *
 * @param {Object} req - Request object
 * @param {string} eventId - ID del evento
 * @returns {Promise<string>} - URL firmada de la imagen
 */
const uploadImages = async (req, path) => {
  if (!req.files || !req.files.image) {
    throw new Error("No files were uploaded");
  }

  const image = req.files.image; // `image` es el campo del formulario de subida

  const remotePath = `${path}/${image.name}${Date.now()}`; // Ruta remota en Firebase Storage

  // Subir la imagen directamente desde la memoria
  const file = bucket.file(remotePath);

  await file.save(image.data, {
    metadata: {
      contentType: image.mimetype,
    },
  });

  // Obtener la URL firmada para el acceso público
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 60 * 60 * 1000, // URL válida por 1 hora
  });
  console.log(url);
  return url; // Retorna la URL firmada
};

module.exports = uploadImages;
