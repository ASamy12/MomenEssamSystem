import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";
// import { app } from "electron";

// Function to open the database with an environment-specific path
function openDb() {
  const isDev = process.env.NODE_ENV !== "production";
  console.log("devvvvvv", isDev);

  const dbPath = isDev
    ? "../../../../teacherWorkManagement.db" // Development path
    : path.join(process.resourcesPath, "teacherWorkManagement.db"); // Production path

  return new Database(dbPath);
}

// GET: Retrieve all centers
export function GET() {
  const db = openDb();
  try {
    const centers = db.prepare("SELECT * FROM Center").all();
    return NextResponse.json(centers);
  } catch (error) {
    console.error("Error fetching centers:", error);
    return NextResponse.json(
      { message: "Error fetching centers" },
      { status: 500 }
    );
  }
}

// POST: Create a new center
export async function POST(req) {
  const db = openDb();
  try {
    const { name } = await req.json();
    console.log("adding center", name);
    const stmt = db.prepare("INSERT INTO Center (name) VALUES (?)");
    const result = stmt.run(name);
    return NextResponse.json(
      { id: result.lastInsertRowid, name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating center:", error);
    return NextResponse.json(
      { message: "Error creating center" },
      { status: 500 }
    );
  }
}

// PUT: Update a center's name by id
export async function PUT(req) {
  const db = openDb();
  try {
    const { id, name } = await req.json();
    const stmt = db.prepare("UPDATE Center SET name = ? WHERE id = ?");
    stmt.run(name, id);
    return NextResponse.json({ id, name });
  } catch (error) {
    console.error("Error updating center:", error);
    return NextResponse.json(
      { message: "Error updating center" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a center by id
export async function DELETE(req) {
  const db = openDb();
  try {
    const { id } = await req.json();
    const stmt = db.prepare("DELETE FROM Center WHERE id = ?");
    stmt.run(id);
    return NextResponse.json({ message: "Center deleted successfully" });
  } catch (error) {
    console.error("Error deleting center:", error);
    return NextResponse.json(
      { message: "Error deleting center" },
      { status: 500 }
    );
  }
}
