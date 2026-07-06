const { PineconeStore } = require("@langchain/pinecone");
const index = require("./pinecone");
const embeddings = require("./embeddings");

async function createVectorStore(documents, userId) {
  const vectorStore = await PineconeStore.fromDocuments(
    documents,
    embeddings,
    {
      pineconeIndex: index,
      namespace: userId,
    }
  );

  console.log("Vector Store Created!");

  return vectorStore;
}

module.exports = {
  createVectorStore,
};