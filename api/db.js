const sqlite3 = require("sqlite3").verbose();
const dbName = "OurDatabase.db";

const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    return console.log(err?.message);
  } else {
    console.log("CONNECTED TO THE DATABASE");
    db.run(
      "CREATE TABLE IF NOT EXISTS contact(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT) ",
      (err) => {
        if (err) {
          console.log(err?.message);
        } else {
          console.log("Contact Table Created Successfully");
        }
      }
    );
  }
});

module.exports = db;
