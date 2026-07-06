const { PDFParse } = require("pdf-parse");

async function extractText(fileBuffer) {
  try {
    const parser = new PDFParse({
      data: fileBuffer,
    });

    const pdfData = await parser.getText();

    await parser.destroy();

    return pdfData.text;
  } catch (error) {
    console.error("PDF Parse Error:", error);
    throw new Error("Failed to extract PDF text");
  }
}

module.exports = {
  extractText,
};