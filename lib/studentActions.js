const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./teacherWorkManagement.db");

// Function to get all students
const getAllStudents = (callback) => {
  const query = `SELECT * FROM Student`;

  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Function to add a new student
const addStudent = (studentData, callback) => {
  const { name, phoneNum, parentNum, studyYear, gender, centerId } =
    studentData;

  const query = `
    INSERT INTO Student (name, phoneNum, parentNum, studyYear, gender, centerId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, phoneNum, parentNum, studyYear, gender, centerId],
    function (err) {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        callback(null, { id: this.lastID, ...studentData });
      }
    }
  );
};

// Function to edit an existing student
const editStudent = (id, studentData, callback) => {
  const { name, phoneNum, parentNum, studyYear, gender, centerId } =
    studentData;

  const query = `
    UPDATE Student
    SET name = ?, phoneNum = ?, parentNum = ?, studyYear = ?, gender = ?, centerId = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [name, phoneNum, parentNum, studyYear, gender, centerId, id],
    function (err) {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        callback(null, { id, ...studentData });
      }
    }
  );
};

// Function to filter students based on any criteria
const filterStudents = (criteria, callback) => {
  let query = `SELECT * FROM Student WHERE 1=1`; // Default query to get all students

  // Add filters dynamically based on the criteria
  const params = [];
  if (criteria.name) {
    query += ` AND name LIKE ?`;
    params.push(`%${criteria.name}%`);
  }
  if (criteria.phoneNum) {
    query += ` AND phoneNum = ?`;
    params.push(criteria.phoneNum);
  }
  if (criteria.studyYear) {
    query += ` AND studyYear = ?`;
    params.push(criteria.studyYear);
  }
  if (criteria.gender) {
    query += ` AND gender = ?`;
    params.push(criteria.gender);
  }
  if (criteria.centerId) {
    query += ` AND centerId = ?`;
    params.push(criteria.centerId);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Function to delete a student by ID
const deleteStudent = (id, callback) => {
  const query = `DELETE FROM Student WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, { deleted: true });
    }
  });
};

// Export all the functions
module.exports = {
  getAllStudents,
  addStudent,
  editStudent,
  filterStudents,
  deleteStudent,
};
