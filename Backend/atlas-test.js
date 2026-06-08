import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log("URI Loaded:", !!uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log("Connecting...");

    await client.connect();

    console.log("Connected!");

    await client.db("admin").command({
      ping: 1,
    });

    console.log("Ping successful!");
  } catch (error) {
    console.error("FAILED:");
    console.error(error);
  } finally {
    await client.close();
  }
}

run();