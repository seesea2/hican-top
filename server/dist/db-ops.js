"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbOpen = exports.dbClose = void 0;
const path_1 = require("path");
const dir_1 = require("./dir");
const Database = require("better-sqlite3");
const dbFile = (0, path_1.join)(dir_1.serverDir, "/msi.sqlite3");
try {
    let db = Database(dbFile);
    db.exec(`CREATE TABLE IF NOT EXISTS Activities(id	TEXT NOT NULL primary key, 
      title	TEXT, 
      status	TEXT, 
      affectedSystems	TEXT, 
      startDatetime	TEXT, 
      endDatetime	TEXT, 
      impact	TEXT, 
      noImpact	TEXT, 
      remarks	TEXT, 
      contactPersons	TEXT,
      createDatetime TEXT,
      updateDatetime TEXT
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS Users(id	TEXT NOT NULL primary key, 
      pwd	TEXT,
      status  TEXT
    );`);
    db.close();
}
catch (e) {
    console.log(e);
}
function dbOpen() {
    let db = Database(dbFile);
    return db;
}
exports.dbOpen = dbOpen;
function dbClose(db) {
    db.close();
}
exports.dbClose = dbClose;
