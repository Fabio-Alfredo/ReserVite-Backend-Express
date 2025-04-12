const admin = require("firebase-admin");
const serviceAccount = require("../../../serviceAccountKey.json"); // Ajusta la ruta

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://reservite-a0e86.firebasestorage.app", // O solo el ID sin "gs://"
  });
}

module.exports = admin;
