"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteActivitity = exports.UpdateActivitity = exports.InsertActivitity = exports.AllActivitity = void 0;
const crypto_1 = require("crypto");
const db_ops_1 = require("../db-ops");
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
function InsertActivitity(data) {
    if (!data || !data.title)
        return;
    try {
        let fields = `"id"`;
        let id = (0, crypto_1.randomUUID)();
        let values = "'" + id + "'";
        for (let i in dbActivitiesColumns) {
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
        for (let i in dbActivitiesColumns) {
            let key = dbActivitiesColumns[i];
            if (data[key]) {
                data[key] = data[key].replace("'", "''");
                sql += `"${key}"='${data[key]}',`;
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
        return e.message;
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
let startDate = new Date();
startDate.setDate(new Date().getDate() - 30);
for (let i = 0; i < 60; ++i) {
    let act1 = {};
    act1.title = "temp atc " + i;
    act1.affectedSystems = "temp device " + i;
    act1.startDatetime = startDate.toISOString();
    act1.endDatetime = startDate.toISOString();
    startDate.setDate(startDate.getDate() + 1);
}
