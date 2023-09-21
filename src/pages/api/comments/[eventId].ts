import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;
  const client = await MongoClient.connect(
    "mongodb+srv://emma:Hx8Z5qlIHpQJaDnN@cluster1.evdwtxy.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes(
        "@" || !name || name.trim() === "" || !text || text.trim() === ""
      )
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment: {
      email: string;
      name: string;
      text: string;
      eventId: string;
      id?: ObjectId;
    } = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;
    
    console.log(result);

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
