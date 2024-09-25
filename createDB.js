const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./teacherWorkManagement.db");

// Create schema function
const createTables = () => {
  // Create Center table
  db.run(`
    CREATE TABLE IF NOT EXISTS Center (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  // Create Student table
  db.run(`
    CREATE TABLE IF NOT EXISTS Student (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phoneNum TEXT NOT NULL,
      parentNum TEXT,
      studyYear INTEGER NOT NULL, -- Add studyYear to Student table
      centerId INTEGER,
      FOREIGN KEY (centerId) REFERENCES Center(id)
    )
  `);

  // Create GeneralSession table
  db.run(`
    CREATE TABLE IF NOT EXISTS GeneralSession (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  // Create CenterSession table to link GeneralSession to Center and add session details
  db.run(`
    CREATE TABLE IF NOT EXISTS CenterSession (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      centerId INTEGER NOT NULL,
      generalSessionId INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      price REAL NOT NULL,
      studyYear INTEGER NOT NULL, -- Add studyYear to CenterSession table
      FOREIGN KEY (centerId) REFERENCES Center(id),
      FOREIGN KEY (generalSessionId) REFERENCES GeneralSession(id)
    )
  `);

  // Create CustomPrice table to assign custom price to students for a specific CenterSession
  db.run(`
    CREATE TABLE IF NOT EXISTS CustomPrice (
      centerSessionId INTEGER NOT NULL,
      studentId INTEGER NOT NULL,
      customPrice REAL NOT NULL,
      FOREIGN KEY (centerSessionId) REFERENCES CenterSession(id),
      FOREIGN KEY (studentId) REFERENCES Student(id),
      PRIMARY KEY (centerSessionId, studentId)
    )
  `);

  // Create AttendedStudents table (many-to-many relationship between students and CenterSessions)
  db.run(`
    CREATE TABLE IF NOT EXISTS AttendedStudents (
      centerSessionId INTEGER,
      studentId INTEGER,
      FOREIGN KEY (centerSessionId) REFERENCES CenterSession(id),
      FOREIGN KEY (studentId) REFERENCES Student(id),
      PRIMARY KEY (centerSessionId, studentId)
    )
  `);

  // Create Homework table
  db.run(`
    CREATE TABLE IF NOT EXISTS Homework (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade REAL,
      studentId INTEGER,
      centerSessionId INTEGER,
      FOREIGN KEY (studentId) REFERENCES Student(id),
      FOREIGN KEY (centerSessionId) REFERENCES CenterSession(id)
    )
  `);

  // Create Test table
  db.run(`
    CREATE TABLE IF NOT EXISTS Test (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullMark REAL NOT NULL,
      grade REAL NOT NULL,
      studentId INTEGER,
      centerSessionId INTEGER,
      FOREIGN KEY (studentId) REFERENCES Student(id),
      FOREIGN KEY (centerSessionId) REFERENCES CenterSession(id)
    )
  `);
};

// Run the function to create tables
db.serialize(() => {
  createTables();
});

db.close();
