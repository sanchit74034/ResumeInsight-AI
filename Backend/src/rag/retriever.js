const { PineconeStore } = require("@langchain/pinecone");
const index = require("./pinecone");
const embeddings = require("./embeddings");

async function retrieveRelevantChunks(userId, query) {
  const vectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex: index,
      namespace: userId,
    }
  );

  const retriever = vectorStore.asRetriever({
    k: 4,
  });

  return await retriever.invoke(query);
}

module.exports = {
  retrieveRelevantChunks,
};