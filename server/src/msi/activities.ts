import { randomUUID } from "crypto";
import { Activity, dbOpen } from "../db-ops";
import { emailActivity as email } from "./email";

const dbActivitiesColumns = [
  "title",
  "status",
  "affectedSystems",
  "startDatetime",
  "endDatetime",
  "impact",
  "noImpact",
  "stakeholders",
  "teams",
  "riskAndMitigation",
  "remarks",
  "contactPersons",
  "createDatetime",
  "updateDatetime",
  "type", // Activity, Issue, Template
];

const dbTemplatesColumns = ["id", "group1", "group2", "created", "updated"];

function InsertActivitity(data: any) {
  if (!data || !data.title) return;

  try {
    let fields = `"id"`;
    let id = randomUUID();
    let values = "'" + id + "'";

    for (let val of dbActivitiesColumns) {
      if (["createDatetime", "updateDatetime"].includes(val)) {
        continue;
      }
      if (data[val]) {
        // console.log(data[val]);
        data[val] = data[val].replace(/'/g, "''");
        fields += `,"${val}"`;
        values += `,'${data[val]}'`;
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
    db.close();

    if (data["type"] == "Template") {
      fields = `"id"`;
      values = "'" + id + "'";
      fields += `,"group1"`;
      values += `,'${data["group1"]}'`;
      fields += `,"group2"`;
      values += `,'${data["group2"]}'`;
      fields += `,"created"`;
      values += ",'" + new Date().toISOString() + "'";
      sql = `insert into "Templates"(${fields}) values(${values});`;
      console.log(sql);
      db = dbOpen();
      stmt = db.prepare(sql);
      stmt.run();
      db.close();
    }

    return id;
  } catch (e) {
    console.log(e);
    return "";
  }
}

function UpdateActivitity(data: any) {
  if (!data || !data.id || !data.title) return;

  try {
    // for Activities table
    let sql = `update "Activities" set `;
    for (let val of dbActivitiesColumns) {
      if (val == "updateDatetime") {
        continue;
      }
      if (data[val]) {
        // console.log(data[key]);
        data[val] = data[val].replace(/'/g, "''");
        sql += `"${val}"='${data[val]}',`;
      }
    }
    sql += `"updateDatetime"='${new Date().toISOString()}' `;
    sql += `where "id"='${data.id}';`;
    console.log("sql: ", sql);
    let db = dbOpen();
    let stmt = db.prepare(sql);
    stmt.run();
    db.close();

    // for Templates table
    if (data["type"] == "Template") {
      let sql = `update "Templates" set `;
      for (let val of dbTemplatesColumns) {
        if (["id", "updated"].includes(val)) {
          continue;
        }
        if (data[val]) {
          // console.log(data[key]);
          data[val] = data[val].replace(/'/g, "''");
          sql += `"${val}"='${data[val]}',`;
        }
      }
      sql += `"updated"='${new Date().toISOString()}' `;
      sql += `where "id"='${data.id}';`;
      console.log("update template sql: ", sql);
      let db = dbOpen();
      let stmt = db.prepare(sql);
      stmt.run();
      db.close();
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function DeleteActivitity(id: string) {
  try {
    let db = dbOpen();
    let stmt = db.prepare(`delete from Activities where id='${id}';`);
    stmt.run();
    stmt = db.prepare(`delete from Templates where id='${id}';`);
    stmt.run();
    db.close();
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
    db.close();
    return record;
  } catch (e) {
    console.log(e);
    return e;
  }
}

function AllActivitity() {
  try {
    let db = dbOpen();
    let stmt = db.prepare(
      `select * from Activities where id not in (select id from Templates) order by "startDatetime" desc;`
    );
    let items = stmt.all();
    // console.log(items);
    // console.log(typeof items);
    db.close();
    return items;
  } catch (e) {
    console.log(e);
  }
}
function ActivitityTemplates() {
  try {
    let db = dbOpen();
    let stmt = db.prepare(
      `select a.*,t.group1,t.group2 from Activities a, Templates t where a.id=t.id order by "group1","group2";`
    );
    let items = stmt.all();
    // console.log(items);
    // console.log(typeof items);
    db.close();
    return items;
  } catch (e) {
    console.log(e);
  }
}

function emailActivity(data: any) {
  console.log(data);
  email(data);
  return { done: true };
}

// for testing
let startDate = new Date();
startDate.setDate(new Date().getDate() - 5);
for (let i = 0; i < 10; ++i) {
  let act1: any = {};
  for (let val of dbActivitiesColumns) {
    act1[val] = "act" + i;
  }
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

export {
  ActivitityTemplates,
  AllActivitity,
  InsertActivitity,
  UpdateActivitity,
  DeleteActivitity,
  emailActivity,
  dbActivitiesColumns,
};
