const { splitResumeIntoChunks } = require("../rag/chunker");
const { createVectorStore } = require("../rag/vectorstore");
const { retrieveRelevantChunks } = require("../rag/retriever");

async function getResumeContext(resumeText, userId, query) {
  const documents = await splitResumeIntoChunks(resumeText);

  const vectorStore = await createVectorStore(documents, userId);

  const relevantDocs = await retrieveRelevantChunks(
    userId,
    query
  );

  const context = relevantDocs
    .map(doc => doc.pageContent)
    .join("\n\n");

  return context;
}

module.exports = {
  getResumeContext,
};