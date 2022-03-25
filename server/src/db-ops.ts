import { join } from "path";
import { serverDir } from "./dir";
const Database = require("better-sqlite3");

interface Activity {
  title?: string;
  status?: string;
  affectedSystems?: string;
  startDatetime?: string;
  endDatetime?: string;
  impact?: string;
  noImpact?: string;
  remarks?: string;
  contactPersons?: string;
  createDatetime?: string;
  updateDatetime?: string;
}

const dbFile = join(serverDir, "/msi.sqlite3");
try {
  let db = Database(dbFile);
  // Activities Table
  db.exec(
    `CREATE TABLE IF NOT EXISTS Activities(id	TEXT NOT NULL primary key, 
      title	TEXT, 
      affectedSystems	TEXT, 
      startDatetime	TEXT, 
      endDatetime	TEXT, 
      impact	TEXT, 
      noImpact	TEXT, 
      remarks	TEXT, 
      contactPersons	TEXT,
      status	TEXT, 
      createDatetime TEXT,
      updateDatetime TEXT
    );`
  );
  // Usres Table
  db.exec(
    `CREATE TABLE IF NOT EXISTS Users(id	TEXT NOT NULL primary key, 
      pwd	TEXT,
      email	TEXT,
      team TEXT,
      role TEXT,
      created TEXT,
      updated TEXT,
      status TEXT
    );`
  );
  // console.log(rslt);
  db.close();
} catch (e) {
  console.log(e);
}

function dbOpen() {
  let db = Database(dbFile);
  return db;
}

export { Activity, dbOpen };
