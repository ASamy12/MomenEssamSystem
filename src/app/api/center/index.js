// pages/api/center/index.js
import { openDb } from "../../../../lib/db";

export default async function handler(req, res) {
  const db = await openDb();

  if (req.method === "GET") {
    const centers = await db.all("SELECT * FROM Center");
    res.status(200).json(centers);
  }

  if (req.method === "POST") {
    const { name } = req.body;
    const result = await db.run("INSERT INTO Center (name) VALUES (?)", name);
    res.status(201).json({ id: result.lastID, name });
  }

  if (req.method === "PUT") {
    const { name } = req.body;
    await db.run("UPDATE Center SET name = ? WHERE id = ?", name, id);
    res.status(200).json({ id, name });
  }

  if (req.method === "DELETE") {
    await db.run("DELETE FROM Center WHERE id = ?", id);
    res.status(200).json({ message: "Center deleted successfully" });
  }
}
