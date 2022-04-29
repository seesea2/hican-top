"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbActivitiesColumns = exports.emailActivity = exports.DeleteActivitity = exports.UpdateActivitity = exports.InsertActivitity = exports.AllActivitity = void 0;
const crypto_1 = require("crypto");
const db_ops_1 = require("../db-ops");
const email_1 = require("./email");
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
];
exports.dbActivitiesColumns = dbActivitiesColumns;
function InsertActivitity(data) {
    if (!data || !data.title)
        return;
    try {
        let fields = `"id"`;
        let id = (0, crypto_1.randomUUID)();
        let values = "'" + id + "'";
        for (let val of dbActivitiesColumns) {
            if (data[val]) {
                console.log(data[val]);
                data[val] = data[val].replace("'", "''");
                fields += `,"${val}"`;
                values += `,'${data[val]}'`;
            }
        }
        fields += `,"createDatetime"`;
        values += ",'" + new Date().toISOString() + "'";
        let sql = `insert into "Activities"(${fields}) values(${values});`;
        console.log("sql: ", sql);
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(sql);
        stmt.run();
        db.close();
        return id;
    }
    catch (e) {
        console.log(e);
        return "";
    }
}
exports.InsertActivitity = InsertActivitity;
function UpdateActivitity(data) {
    if (!data || !data.id || !data.title)
        return;
    try {
        let sql = `update "Activities" set `;
        for (let val of dbActivitiesColumns) {
            if (data[val]) {
                data[val] = data[val].replace("'", "''");
                sql += `"${val}"='${data[val]}',`;
            }
        }
        sql += `"updateDatetime"='${new Date().toISOString()}' `;
        sql += `where "id"='${data.id}';`;
        console.log("sql: ", sql);
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(sql);
        console.log(stmt.run());
        db.close();
        return true;
    }
    catch (e) {
        console.log(e);
        return "";
    }
}
exports.UpdateActivitity = UpdateActivitity;
function DeleteActivitity(id) {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`delete from Activities where id='${id}';`);
        stmt.run();
        db.close();
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
exports.DeleteActivitity = DeleteActivitity;
function SelectActivitity(id) {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select * from Activities where id='${id}';`);
        let record = stmt.get();
        db.close();
        return record;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
function AllActivitity() {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select * from Activities order by "startDatetime" desc;`);
        let items = stmt.all();
        db.close();
        return items;
    }
    catch (e) {
        console.log(e);
    }
}
exports.AllActivitity = AllActivitity;
function emailActivity(data) {
    console.log(data);
    (0, email_1.emailActivity)(data);
    return { done: true };
}
exports.emailActivity = emailActivity;
let startDate = new Date();
startDate.setDate(new Date().getDate() - 5);
for (let i = 0; i < 10; ++i) {
    let act1 = {};
    for (let val of dbActivitiesColumns) {
        act1[val] = "act" + i;
    }
    act1.startDatetime = startDate.toISOString();
    act1.endDatetime = startDate.toISOString();
    startDate.setDate(startDate.getDate() + 1);
}
