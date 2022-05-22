"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbOpen = void 0;
const path_1 = require("path");
const dir_1 = require("./dir");
const Database = require("better-sqlite3");
const dbFile = (0, path_1.join)(dir_1.serverDir, "/msi.sqlite3");
try {
    let db = Database(dbFile);
    db.exec(`CREATE TABLE IF NOT EXISTS Activities(id	TEXT NOT NULL primary key, 
      title	TEXT, 
      affectedSystems	TEXT, 
      startDatetime	TEXT, 
      endDatetime	TEXT, 
      impact	TEXT, 
      noImpact	TEXT, 
      stakeholders	TEXT, 
      teams	TEXT, 
      riskAndMitigation	TEXT, 
      remarks	TEXT, 
      contactPersons	TEXT,
      status	TEXT, 
      createDatetime TEXT,
      updateDatetime TEXT,
      type TEXT
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS Templates(id	TEXT NOT NULL primary key, 
      group1 TEXT,
      group2 TEXT,
      created TEXT,
      updated TEXT
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS Users(id	TEXT NOT NULL primary key, 
      pwd	TEXT,
      email	TEXT,
      team TEXT,
      role TEXT,
      created TEXT,
      updated TEXT,
      status TEXT
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS Emails(email	TEXT NOT NULL primary key, 
      name	TEXT,
      company	TEXT,
      team	TEXT,
      role TEXT,
      created TEXT,
      updated TEXT,
      status TEXT
    );`);
    db.exec(`CREATE TABLE IF NOT EXISTS EmailGroupRelation("email"	TEXT NOT NULL, 
      "group" TEXT NOT NULL,
      "created" TEXT,
      "updated" TEXT,
      "status" TEXT,
      primary key ("email", "group")
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
