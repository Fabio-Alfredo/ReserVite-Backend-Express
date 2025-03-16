const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

/**
 * Genera un PDF con los datos del ticket
 *
 * @param {Object} ticketData - Datos del ticket
 * @param {String} outputPath - Ruta de salida del PDF
 * @returns {Promise<String>} - Ruta del PDF generado
 */
const generateTicketPDF = (ticketData, outputPath) => {
  return new Promise(async (resolve, reject) => {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generar el código QR
    const qrData = JSON.stringify(ticketData.reservation);
    const qrPath = path.join(dir, "ticket_qr.png");
    await QRCode.toFile(qrPath, qrData, { width: 150 });

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Agregar texto
    doc.fontSize(18).text("🎟 Entrada de Evento", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Nombre: ${ticketData.user}`);
    doc.text(`Reservation id: ${ticketData.reservation}`);
    doc.text(`Fecha de pago: ${ticketData.date}`);
    doc.text(`Id de pago: ${ticketData.payment}`);
    doc.text(`Ubicación: ${ticketData.location}`);
    doc.text(`Asientos: ${ticketData.seats}`);
    doc.moveDown();

    // Agregar el código QR
    if (fs.existsSync(qrPath)) {
      doc.image(qrPath, 200, 500, { width: 100 });
    }

    doc.end();

    stream.on("finish", () => {
      console.log(`PDF generado correctamente en: ${outputPath}`);
      resolve(outputPath);
    });

    stream.on("error", (err) => {
      console.error("Error al generar el PDF:", err);
      reject(err);
    });
  });
};

module.exports = generateTicketPDF;
