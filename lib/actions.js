const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./teacherWorkManagement.db");

// ---------- Center Operations ----------

// Create a new center
const createCenter = (name, callback) => {
  db.run(`INSERT INTO Center (name) VALUES (?)`, [name], function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
};

// Read all centers
const getAllCenters = (callback) => {
  db.all(`SELECT * FROM Center`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Update a center by ID
const updateCenter = (id, name, callback) => {
  db.run(`UPDATE Center SET name = ? WHERE id = ?`, [name, id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

// Delete a center by ID
const deleteCenter = (id, callback) => {
  db.run(`DELETE FROM Center WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

// ---------- Student Operations ----------

// Create a new student
const createStudent = (name, phoneNum, parentNum, centerId, callback) => {
  db.run(
    `INSERT INTO Student (name, phoneNum, parentNum, centerId) VALUES (?, ?, ?, ?)`,
    [name, phoneNum, parentNum, centerId],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

// Read all students
const getAllStudents = (callback) => {
  db.all(`SELECT * FROM Student`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Update a student by ID
const updateStudent = (id, name, phoneNum, parentNum, centerId, callback) => {
  db.run(
    `UPDATE Student SET name = ?, phoneNum = ?, parentNum = ?, centerId = ? WHERE id = ?`,
    [name, phoneNum, parentNum, centerId, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    }
  );
};

// Delete a student by ID
const deleteStudent = (id, callback) => {
  db.run(`DELETE FROM Student WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

// ---------- Session Operations ----------

// Create a new session
const createSession = (date, time, name, price, centerId, callback) => {
  db.run(
    `INSERT INTO Session (date, time, name, price, centerId) VALUES (?, ?, ?, ?, ?)`,
    [date, time, name, price, centerId],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

// Read all sessions
const getAllSessions = (callback) => {
  db.all(`SELECT * FROM Session`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Update a session by ID
const updateSession = (id, date, time, name, price, centerId, callback) => {
  db.run(
    `UPDATE Session SET date = ?, time = ?, name = ?, price = ?, centerId = ? WHERE id = ?`,
    [date, time, name, price, centerId, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    }
  );
};

// Delete a session by ID
const deleteSession = (id, callback) => {
  db.run(`DELETE FROM Session WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

// ---------- Homework Operations ----------

// Create a new homework entry
const createHomework = (studentId, grade, sessionId, callback) => {
  db.run(
    `INSERT INTO Homework (studentId, grade, sessionId) VALUES (?, ?, ?)`,
    [studentId, grade, sessionId],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

// Read all homework
const getAllHomework = (callback) => {
  db.all(`SELECT * FROM Homework`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// ---------- Test Operations ----------

// Create a new test entry
const createTest = (fullMark, grade, studentId, sessionId, callback) => {
  db.run(
    `INSERT INTO Test (fullMark, grade, studentId, sessionId) VALUES (?, ?, ?, ?)`,
    [fullMark, grade, studentId, sessionId],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

// Read all tests
const getAllTests = (callback) => {
  db.all(`SELECT * FROM Test`, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Export all functions
module.exports = {
  createCenter,
  getAllCenters,
  updateCenter,
  deleteCenter,
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
  createHomework,
  getAllHomework,
  createTest,
  getAllTests,
};
