const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

async function splitResumeIntoChunks(resumeText) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const documents = await textSplitter.createDocuments([resumeText]);

  return documents;
}
module.exports = {
  splitResumeIntoChunks,
};
