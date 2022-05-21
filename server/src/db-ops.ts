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
  stakeholders?: string;
  teams?: string;
  riskAndMitigation?: string;
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
      stakeholders	TEXT, 
      teams	TEXT, 
      riskAndMitigation	TEXT, 
      remarks	TEXT, 
      contactPersons	TEXT,
      status	TEXT, 
      createDatetime TEXT,
      updateDatetime TEXT,
      type TEXT
    );`
  );
  // Table for Activity Template
  db.exec(
    `CREATE TABLE IF NOT EXISTS Templates(id	TEXT NOT NULL primary key, 
      group1 TEXT,
      group2 TEXT,
      created TEXT,
      updated TEXT
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
  // Customer Emails Table
  db.exec(
    `CREATE TABLE IF NOT EXISTS Emails(email	TEXT NOT NULL primary key, 
      name	TEXT,
      company	TEXT,
      team	TEXT,
      role TEXT,
      created TEXT,
      updated TEXT,
      status TEXT
    );`
  );
  // Email Groups Table
  // db.exec(
  //   `CREATE TABLE IF NOT EXISTS EmailGroups("group"	TEXT NOT NULL primary key,
  //     created TEXT,
  //     updated TEXT,
  //     status TEXT
  //   );`
  // );
  // Email Groups Relationship Table
  db.exec(
    `CREATE TABLE IF NOT EXISTS EmailGroupRelation(email	TEXT NOT NULL, 
      "group" TEXT NOT NULL,
      created TEXT
      updated TEXT,
      status TEXT,
      primary key (email, "group")
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
