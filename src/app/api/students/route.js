import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

// Open the SQLite database
function openDb() {
  const dbPath = path.join(process.cwd(), "teacherWorkManagement.db");
  return new Database(dbPath);
}

// GET: Retrieve all students with optional filters
export function GET(req) {
  const db = openDb();

  // Get the query parameters
  const { searchParams } = new URL(req.url);
  const studyYear = searchParams.get("studyYear");
  const gender = searchParams.get("gender");
  const centerId = searchParams.get("centerId");

  try {
    let query = "SELECT * FROM Student WHERE 1=1"; // Base query for conditional filters
    const queryParams = [];

    if (studyYear) {
      query += " AND studyYear = ?";
      queryParams.push(studyYear);
    }

    if (gender) {
      query += " AND gender = ?";
      queryParams.push(gender);
    }

    if (centerId) {
      query += " AND centerId = ?";
      queryParams.push(centerId);
    }

    // Execute the query with the parameters
    const stmt = db.prepare(query);
    const students = stmt.all(...queryParams);

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "Error fetching students" },
      { status: 500 }
    );
  }
}

// POST: Create a new student
export async function POST(req) {
  const db = openDb();
  const { name, phoneNum, parentNum, studyYear, gender, centerId } =
    await req.json();

  try {
    const stmt = db.prepare(
      "INSERT INTO Student (name, phoneNum, parentNum, studyYear, gender, centerId) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(
      name,
      phoneNum,
      parentNum,
      studyYear,
      gender,
      centerId
    );
    return NextResponse.json(
      { message: "Student created successfully", id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { message: "Error creating student" },
      { status: 500 }
    );
  }
}

// PUT: Update a student's information by id
export async function PUT(req) {
  const db = openDb();
  const { id, name, phoneNum, parentNum, studyYear, gender, centerId } =
    await req.json();

  try {
    const stmt = db.prepare(
      "UPDATE Student SET name = ?, phoneNum = ?, parentNum = ?, studyYear = ?, gender = ?, centerId = ? WHERE id = ?"
    );
    stmt.run(name, phoneNum, parentNum, studyYear, gender, centerId, id);
    return NextResponse.json({ id, message: "Student updated successfully" });
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { message: "Error updating student" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a student by id
export async function DELETE(req) {
  const db = openDb();
  const { id } = await req.json();

  try {
    const stmt = db.prepare("DELETE FROM Student WHERE id = ?");
    stmt.run(id);
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { message: "Error deleting student" },
      { status: 500 }
    );
  }
}
