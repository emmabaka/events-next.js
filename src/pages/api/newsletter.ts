import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://emma:Hx8Z5qlIHpQJaDnN@cluster1.evdwtxy.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

async function insertDocument(
  client: MongoClient,
  document: { email: string }
) {
  const db = client.db();

  await db.collection("newsletter").insertOne(document);
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client: MongoClient | undefined;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client!.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
