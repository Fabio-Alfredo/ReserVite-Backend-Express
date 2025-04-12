const admin = require("firebase-admin");
const serviceAccount = require("../../../serviceAccountKey.json"); // Ajusta la ruta
const { bucket } = require("../config");


if (!admin.apps.length) {
  console.log("Firebase config loaded", bucket);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucket, // O solo el ID sin "gs://"
  });
}

module.exports = admin;
