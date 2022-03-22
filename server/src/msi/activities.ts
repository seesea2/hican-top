import { randomUUID } from "crypto";
import { Activity, dbOpen, dbClose } from "../db-ops";

const dbActivitiesColumns = [
  "title",
  "status",
  "affectedSystems",
  "startDatetime",
  "endDatetime",
  "impact",
  "noImpact",
  "remarks",
  "contactPersons",
  "createDatetime",
  "updateDatetime",
];

function InsertActivitity(data: any) {
  if (!data || !data.title) return;

  try {
    let fields = `"id"`;
    let id = randomUUID();
    let values = "'" + id + "'";

    for (let i = 0; i < dbActivitiesColumns.length; ++i) {
      let key = dbActivitiesColumns[i];
      if (data[key]) {
        console.log(data[key]);
        data[key] = data[key].replace("'", "''");
        fields += `,"${key}"`;
        values += `,'${data[key]}'`;
      }
    }

    fields += `,"createDatetime"`;
    values += ",'" + new Date().toISOString() + "'";
    // console.log(fields.length, fields);
    // console.log(values.length, values);

    let sql = `insert into "Activities"(${fields}) values(${values});`;
    console.log("sql: ", sql);
    let db = dbOpen();
    let stmt = db.prepare(sql);
    stmt.run();
    dbClose(db);
    return id;
  } catch (e) {
    console.log(e);
    return "";
  }
}

function UpdateActivitity(data: any) {
  if (!data || !data.id || !data.title) return;

  try {
    let sql = `update "Activities" set `;
    for (let i = 0; i < dbActivitiesColumns.length; ++i) {
      let key = dbActivitiesColumns[i];
      if (data[key]) {
        // console.log(data[key]);
        data[key] = data[key].replace("'", "''");
        sql += `"${key}"='${data[key]}',`;
      }
    }
    sql += `"updateDatetime"='${new Date().toISOString()}' `;
    sql += `where "id"='${data.id}';`;
    console.log("sql: ", sql);
    let db = dbOpen();
    let stmt = db.prepare(sql);
    console.log(stmt.run());
    dbClose(db);
    return true;
  } catch (e) {
    console.log(e);
    return "";
  }
}

function DeleteActivitity(id: string) {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`delete from Activities where id='${id}';`);
    stmt.run();
    dbClose(db);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function SelectActivitity(id: string) {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`select * from Activities where id='${id}';`);
    let record = stmt.get();
    dbClose(db);
    return record;
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

function AllActivitity() {
  try {
    let db = dbOpen();
    let stmt = db.prepare(
      `select * from Activities order by "startDatetime" desc;`
    );
    let items = stmt.all();
    // console.log(item);
    // console.log(typeof items);
    dbClose(db);
    return items;
  } catch (e) {
    console.log(e);
  }
}

// for testing
let startDate = new Date();
startDate.setDate(new Date().getDate() - 30);
for (let i = 0; i < 60; ++i) {
  let act1: Activity = {};
  act1.title = "temp atc " + i;
  act1.affectedSystems = "temp device " + i;
  act1.startDatetime = startDate.toISOString();
  act1.endDatetime = startDate.toISOString();
  startDate.setDate(startDate.getDate() + 1);
  // InsertActivitity(act1);
}
// DeleteActivitity("0c081a21-60fd-4f4e-9cba-00c202e6f866");
// DeleteActivitity("1741edd5-e1f7-4af5-8690-ff389b1dd3db");
// DeleteActivitity("5f543ef6-b1d8-426e-9936-0c3ec40c5d84");
// SelectActivitity("4af12771-91e3-4dd7-8e32-c04b61b769d2");
// let items: Activity[] = AllActivitity();
// items.forEach((item) => {
//   console.log(JSON.stringify(item));
// });

// let j = { type: "INSERT" };
// console.log(JSON.stringify(j));

export { AllActivitity, InsertActivitity, UpdateActivitity, DeleteActivitity };
