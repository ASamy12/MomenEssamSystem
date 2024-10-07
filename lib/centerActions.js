const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./teacherWorkManagement.db");

// Function to get all centers
const getAllCenters = (callback) => {
  const query = `SELECT * FROM Center`;

  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Function to add a new center
const addCenter = (centerData, callback) => {
  const { name } = centerData;

  const query = `
    INSERT INTO Center (name)
    VALUES (?)
  `;

  db.run(query, [name], function (err) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, { id: this.lastID, name });
    }
  });
};

// Function to edit an existing center
const editCenter = (id, centerData, callback) => {
  const { name } = centerData;

  const query = `
    UPDATE Center
    SET name = ?
    WHERE id = ?
  `;

  db.run(query, [name, id], function (err) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      callback(null, { id, name });
    }
  });
};

// Export all the functions
module.exports = {
  getAllCenters,
  addCenter,
  editCenter,
};
