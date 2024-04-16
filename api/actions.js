const db = require("./db");

function GetContact(id, callback) {
  const selectSql = "SELECT * FROM contact WHERE id=?";
  db.get(selectSql, [id], function (err, row) {
    if (err) {
      return callback(err);
    }
    if (!row) {
      return callback(new Error("This Entry Doesn't Exists in Our Database"));
    }
    callback(null, row);
  });
}
function AddContact(name, email, message, callback) {
  const sql = "INSERT INTO contact(name, email, message) VALUES (?, ?, ?)";

  db.run(sql, [name, email, message], function (err) {
    if (err) {
      return callback(err);
    }

    const lastId = this.lastID;
    const selectSql = "SELECT * FROM contact WHERE id=?";
    db.get(selectSql, [lastId], function (err, row) {
      if (err) {
        return callback(err);
      }

      callback(null, row);
    });
  });
}

function DeleteUser(id, callback) {
  const sql = "DELETE FROM contact WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      callback(err);
      return;
    }
    console.log("What deleted", this.changes);
    callback(null, this.changes);
  });
}

function UpdateUserInfo(id, name, email, message, callback) {
  const sql = "UPDATE contact SET name=?, email=?, message=? WHERE id=?";

  db.run(sql, [name, email, message, id], function (err) {
    if (err) {
      return callback(err);
    }

    if (this.changes === 0) {
      return callback(new Error("No rows were updated"));
    }

    const fetchDataSql = "SELECT * FROM contact WHERE id = ?";
    db.get(fetchDataSql, [id], function (err, row) {
      if (err) {
        return callback(err);
      }
      return callback(null, row);
    });
  });
}
module.exports = { AddContact, DeleteUser, UpdateUserInfo, GetContact };
