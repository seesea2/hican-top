"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsOfEmail = exports.emailsInGroup = exports.deleteEmailGroup = exports.deleteEmail = exports.postEmailGroup = exports.allEmailGroups = exports.allEmails = exports.postEmailAddr = void 0;
const db_ops_1 = require("../db-ops");
const dbEmailsColumns = [
    "email",
    "name",
    "company",
    "team",
    "role",
    "created",
    "updated",
    "status",
];
function postEmailAddr(data) {
    if (!data || !data.email || !data.email.includes("@")) {
        return { err: "Invalid email." };
    }
    try {
        data.email = data.email.toLowerCase();
        if (data.company) {
            data.company = data.company.toUpperCase();
        }
        let db = (0, db_ops_1.dbOpen)();
        if (data.orgEmail != data.email) {
            let stmt = db.prepare(`select * from Emails where "email"='${data.email}';`);
            let record = stmt.get();
            if (record && record.email) {
                db.close();
                return { err: "Issue: Email existed." };
            }
        }
        let dateTimeStr = new Date().toISOString();
        if (data.orgEmail) {
            let setInfo = ``;
            for (let val of dbEmailsColumns) {
                if (["created", "updated"].includes(val)) {
                    continue;
                }
                if (data[val]) {
                    setInfo += `"${val}"='${data[val]}',`;
                }
            }
            setInfo += `"updated"='${dateTimeStr}'`;
            let sql = `update "Emails" 
        set ${setInfo} where "email"='${data.orgEmail}';`;
            console.log(sql);
            let stmt = db.prepare(sql);
            let ret = stmt.run();
            console.log(ret);
        }
        if (data.orgEmail) {
            let sql = `update "EmailGroupRelation" set "email"='${data.email}', "updated"='${dateTimeStr}' where "email"='${data.orgEmail}';`;
            console.log(sql);
            let stmt = db.prepare(sql);
            let ret = stmt.run();
            console.log(ret);
        }
        if (!data.orgEmail) {
            let fields = "";
            let values = "";
            for (let val of dbEmailsColumns) {
                if (["created", "updated"].includes(val)) {
                    continue;
                }
                if (data[val]) {
                    fields += `"${val}",`;
                    values += `'${data[val]}',`;
                }
            }
            fields += `"created"`;
            values += `'${dateTimeStr}'`;
            let sql = `insert into "Emails"(${fields}) values(${values});`;
            console.log("sql: ", sql);
            let stmt = db.prepare(sql);
            let record = stmt.run();
            console.log("insert record result:", record);
        }
        for (let group of data.groups) {
            if (data.orgGroups && !data.orgGroups.includes(group)) {
                let sql = `insert into "EmailGroupRelation"('email','group','created') values('${data.email}', '${group}', '${dateTimeStr}');`;
                console.log("insert EmailGroupRelation sql:", sql);
                let stmt = db.prepare(sql);
                let ret = stmt.run();
                console.log(ret);
            }
        }
        for (let orgGroup of data.orgGroups) {
            if (data.groups && !data.groups.includes(orgGroup)) {
                let sql = `delete from "EmailGroupRelation" where "email"='${data.email}' and "group"='${orgGroup}';`;
                console.log("delete from EmailGroupRelation sql:", sql);
                let stmt = db.prepare(sql);
                let ret = stmt.run();
                console.log(ret);
            }
        }
        db.close();
        return { msg: "Successful." };
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.postEmailAddr = postEmailAddr;
function postEmailGroup(data) {
    if (!data || !data.group) {
        return { err: "Invalid group name." };
    }
    try {
        let db = (0, db_ops_1.dbOpen)();
        if (data.orgGroup != data.group) {
            let stmt = db.prepare(`select * from "EmailGroupRelation" where "group"='${data.group}';`);
            let record = stmt.get();
            if (record && record.group) {
                db.close();
                return { err: "Issue: Group name existed." };
            }
        }
        let dateTimeStr = new Date().toISOString();
        if (data.orgGroup && data.orgGroup != data.group) {
            let sql = `update "EmailGroupRelation" 
        set "group"='${data.group}', "updated"='${dateTimeStr}' 
        where "group"='${data.orgGroup}';`;
            console.log(sql);
            let stmt = db.prepare(sql);
            let ret = stmt.run();
            console.log(ret);
        }
        for (let email of data.emails) {
            if (data.orgEmails && !data.orgEmails.includes(email)) {
                let sql = `insert into "EmailGroupRelation"('email','group','created') values('${email}', '${data.group}', '${dateTimeStr}' );`;
                console.log("insert EmailGroupRelation sql:", sql);
                let stmt = db.prepare(sql);
                stmt.run();
            }
        }
        for (let orgEmail of data.orgEmails) {
            if (data.emails && !data.emails.includes(orgEmail)) {
                let sql = `delete from "EmailGroupRelation" where "email"='${orgEmail}' and "group"='${data.group}';`;
                console.log("delete from EmailGroupRelation sql:", sql);
                let stmt = db.prepare(sql);
                let ret = stmt.run();
                console.log(ret);
            }
        }
        db.close();
        return { msg: "Successful." };
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.postEmailGroup = postEmailGroup;
function deleteEmail(email) {
    console.log("deleteEmail:", email);
    try {
        console.log(`delete from Emails where "email"='${email}';`);
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`delete from Emails where "email"='${email}';`);
        let ret = stmt.run();
        console.log(ret);
        console.log(`delete from EmailGroupRelation where "email"='${email}';`);
        stmt = db.prepare(`delete from EmailGroupRelation where "email"='${email}';`);
        ret = stmt.run();
        console.log(ret);
        db.close();
        return ret;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.deleteEmail = deleteEmail;
function deleteEmailGroup(group) {
    console.log("deleteEmailGroup:", group);
    try {
        let db = (0, db_ops_1.dbOpen)();
        console.log(`delete from EmailGroupRelation where "group"='${group}';`);
        let stmt = db.prepare(`delete from EmailGroupRelation where "group"='${group}';`);
        let ret = stmt.run();
        console.log(ret);
        db.close();
        return ret;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.deleteEmailGroup = deleteEmailGroup;
function allEmails() {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select * from Emails;`);
        let records = stmt.all();
        db.close();
        return records;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.allEmails = allEmails;
function allEmailGroups() {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select distinct "group" from EmailGroupRelation;`);
        let records = stmt.all();
        db.close();
        return records;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.allEmailGroups = allEmailGroups;
function emailsInGroup(group) {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select distinct "email" from EmailGroupRelation where "group"='${group}';`);
        let records = stmt.all();
        db.close();
        return records;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.emailsInGroup = emailsInGroup;
function groupsOfEmail(email) {
    try {
        let db = (0, db_ops_1.dbOpen)();
        let stmt = db.prepare(`select distinct "group" from EmailGroupRelation where "email"='${email}';`);
        let records = stmt.all();
        db.close();
        return records;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
exports.groupsOfEmail = groupsOfEmail;
