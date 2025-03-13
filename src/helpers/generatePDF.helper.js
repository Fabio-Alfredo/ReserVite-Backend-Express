const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateTicketPDF = (ticketData, outputPath) => {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    doc.fontSize(18).text("🎟 Entrada de Evento", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Nombre: ${ticketData.user}`);
    doc.text(`Reservation id: ${ticketData.reservation}`);
    doc.text(`Fecha de pago: ${ticketData.date}`);
    doc.text(`Id de pago: ${ticketData.payment}`);
    doc.text(`Ubicación: ${ticketData.location}`);
    doc.text(`Asientos: ${ticketData.seats}`);
    doc.moveDown();

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
