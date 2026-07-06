require("dotenv").config();

const { Pinecone } = require("@pinecone-database/pinecone");

async function test() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexes = await pc.listIndexes();

  console.log(indexes);
}

test();